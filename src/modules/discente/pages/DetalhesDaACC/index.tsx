/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { FiDownload, FiEdit, FiTrash } from 'react-icons/fi';

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, SimpleGrid, SkeletonText, Stack, Tooltip } from '@chakra-ui/react';
import STATUS_DA_ACC from '../../../../constants/StatusDaACC';
import api from '../../../../services/api';
import PageTitle from '../../../../components/PageTitle';
import { notifyError, notifySuccess } from '../../../../components/Notifications';
import { IACC, ParamTypes } from './dtos';

export function DetalhesDaAcc(): JSX.Element {
  const [acc, setACC] = useState<IACC>();
  const [pontos, setPontos] = useState<number>(0);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const cancelRef = useRef<any>();

  const history = useHistory();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    async function loadACC() {
      try {
        setIsLoading(true);
        const response = await api.get(`accs/${id}`);
        setACC(response.data);

        setPontos(response.data.quantity * response.data.acc_variant.points_per_unity)

      } catch (err) {
        notifyError('Não foi possível carregar os dados :(')
      } finally {
        setIsLoading(false);
      }
    }
    loadACC();
  }, []);

  function handleStatus() {
    switch (acc?.acc_status.id) {
      case STATUS_DA_ACC.APROVADA:
        return (
          <strong style={{ color: 'teal' }}>{acc.acc_status.name}</strong>
        );

      case STATUS_DA_ACC.EM_ANALISE:
        return (
          <strong style={{ color: 'gray' }}>{acc.acc_status.name}</strong>
        );

      case STATUS_DA_ACC.NEGADA:
        return (
          <strong style={{ color: 'tomato' }}>{acc.acc_status.name}</strong>
        );
      default:
        return <></>;
    }
  }

  async function deleteACC() {
    try {
      await api.delete(`accs/${id}`);
      notifySuccess('A ACC foi excluída')
      history.goBack();
    } catch (err) {
      notifyError('Não foi possível excluir a ACC :(');
    }
  }

  return (
    <>
      <PageTitle
        actions={(
          <>
            {/* <Tooltip label="Editar" aria-label="Editar" hasArrow>
              <IconButton aria-label="edit" icon={<FiEdit />} size="sm" />
            </Tooltip> */}
            <Tooltip label="Excluir" aria-label="Excluir" hasArrow>
              <IconButton colorScheme="red" aria-label="delete" icon={<FiTrash />} onClick={() => setIsAlertDeleteOpen(true)} size="sm" />
            </Tooltip>
          </>
        )}
      >
        Detalhes da ACC
      </PageTitle>

      <Stack spacing="5" marginTop="5">
        <Box>
          <Box width="100%" color="gray.500">
            Tipo de ACC
          </Box>
          {
            !isLoading ? (
              <>
                {
                acc?.acc_variant.description
                ?
                  <Box width="100%">{`${acc?.acc_type.name} (${acc?.acc_variant.description || ''})`}</Box>
                :
                  <Box width="100%">{`${acc?.acc_type.name}`}</Box>
            }
              </>
          )
            :
              <SkeletonText />
          }
        </Box>

        {
          acc?.created_at && (
          <Box>
            <Box width="100%" color="gray.500">
              Criada em
            </Box>
            {
              !isLoading
              ?
                <Box width="100%">{new Date(acc?.created_at).toLocaleString()}</Box>
              :
                <SkeletonText noOfLines={1} />
            }
          </Box>
          )
        }

        <Stack
          direction="row"
          spacing={[0, 100]}
          justifyContent={['space-between', 'flex-start']}
        >
          <Box>
            <Box width="100%" color="gray.500">
              Status
            </Box>
            {
              !isLoading
              ?
                <Box width="100%">{handleStatus()}</Box>
              :
                <SkeletonText noOfLines={1} />
            }
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              {`${acc?.acc_type.unity_of_measurement.name}s` || 'Horas'}
            </Box>
            {
              !isLoading
              ?
                <Box width="100%">{acc?.quantity}</Box>
              :
                <SkeletonText noOfLines={1} />
            }
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              Pontos
            </Box>
            {
              !isLoading
              ?
                <Box width="100%">{pontos}</Box>
              :
                <SkeletonText noOfLines={1} />
            }
          </Box>
        </Stack>

        <Box>
          <Box width="100%" color="gray.500">
            Descrição
          </Box>
          {
            !isLoading
          ?
            <Box width="100%">{acc?.description}</Box>
          :
            <SkeletonText noOfLines={1} />
          }
        </Box>

        {acc?.acc_status.id === STATUS_DA_ACC.APROVADA ||
          (acc?.acc_status.id === STATUS_DA_ACC.NEGADA && (
            <SimpleGrid columns={[1, 2]}>
              <Box>
                <Box width="100%" color="gray.500">
                  Avaliada por
                </Box>
                <Box width="100%">{acc?.acc_assessment.user.name}</Box>
              </Box>
              <Box>
                <Box width="100%" color="gray.500">
                  Data da Avaliação
                </Box>
                <Box width="100%">{new Date(acc?.acc_assessment.created_at).toLocaleString()}</Box>
              </Box>
            </SimpleGrid>
          ))}

        {acc?.acc_status.id === STATUS_DA_ACC.NEGADA && (
          <Box>
            <Box width="100%" color="gray.500">
              Motivo da Reprovação
            </Box>
            <Box width="100%">{acc?.acc_assessment.description}</Box>
          </Box>
        )}

        <Box display="flex" justifyContent="center">
          <Button
            colorScheme="gray"
            onClick={() => downloadRef.current?.click()}
          >
            <FiDownload style={{ marginRight: 10 }} />
            Baixar Certificado
          </Button>
          <a
            style={{ visibility: 'hidden' }}
            href={`${process.env.REACT_APP_API}/certificates/${acc?.certificate.id}`}
            ref={downloadRef}
          >
            baixar
          </a>
        </Box>
      </Stack>


      <AlertDialog
        isOpen={isAlertDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertDeleteOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir ACC
            </AlertDialogHeader>

            <AlertDialogBody>
              <p>
                Tem certeza que deseja excluir a ACC?
              </p>
              {
                acc?.acc_status.id === STATUS_DA_ACC.APROVADA &&
                <p>A pontuação obtida nessa ACC será retirada da sua contagem total de pontos.</p>
              }
              <p>
                Essa ação não pode ser desfeita.
              </p>

            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsAlertDeleteOpen(false)}
              >
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={deleteACC} ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default withRouter(DetalhesDaAcc);
