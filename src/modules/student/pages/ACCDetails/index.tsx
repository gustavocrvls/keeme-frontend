import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  IconButton,
  SimpleGrid,
  SkeletonText,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { ACC_STATUS } from '../../../../constants/ACCStatus';
import { api } from '../../../../services/api';
import PageTitle from '../../../../components/PageTitle';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { IACC, ParamTypes } from './dtos';
import { DownloadButton } from '../../../../components/DownloadButton';

export function ACCDetails(): JSX.Element {
  const [acc, setACC] = useState<IACC>();
  const [pontos, setPontos] = useState<number>(0);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cancelRef = useRef<any>();

  const history = useHistory();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    async function loadACC() {
      try {
        setIsLoading(true);
        const response = await api.get(`accs/${id}`);
        setACC(response.data);

        setPontos(
          response.data.quantity * response.data.acc_variant.points_per_unity,
        );
      } catch (err) {
        notifyError('Não foi possível carregar os dados :(');
      } finally {
        setIsLoading(false);
      }
    }
    loadACC();
  }, []);

  function handleStatus() {
    switch (acc?.acc_status.id) {
      case ACC_STATUS.APPROVED:
        return <strong style={{ color: 'teal' }}>{acc.acc_status.name}</strong>;

      case ACC_STATUS.UNDER_ANALYSIS:
        return <strong style={{ color: 'gray' }}>{acc.acc_status.name}</strong>;

      case ACC_STATUS.FAILED:
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
      notifySuccess('A ACC foi excluída');
      history.goBack();
    } catch (err) {
      notifyError('Não foi possível excluir a ACC :(');
    }
  }

  return (
    <>
      <PageTitle
        // eslint-disable-next-line prettier/prettier
        actions={(
          <Tooltip label="Excluir" aria-label="Excluir" hasArrow>
            <IconButton
              colorScheme="red"
              aria-label="delete"
              icon={<FiTrash />}
              onClick={() => setIsAlertDeleteOpen(true)}
              size="sm"
            />
          </Tooltip>
          // eslint-disable-next-line prettier/prettier
        )}
      >
        Detalhes da ACC
      </PageTitle>

      <Stack spacing="5" marginTop="5">
        <Box>
          <Box width="100%" color="gray.500">
            Tipo de ACC
          </Box>
          {!isLoading ? (
            <>
              {acc?.acc_variant.description ? (
                <Box width="100%">
                  {`${acc?.acc_type.name} (${
                    acc?.acc_variant.description || ''
                  })`}
                </Box>
              ) : (
                <Box width="100%">{`${acc?.acc_type.name}`}</Box>
              )}
            </>
          ) : (
            <SkeletonText />
          )}
        </Box>

        {acc?.created_at && (
          <Box>
            <Box width="100%" color="gray.500">
              Criada em
            </Box>
            {!isLoading ? (
              <Box width="100%">
                {new Date(acc?.created_at).toLocaleString()}
              </Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>
        )}

        <Stack
          direction="row"
          spacing={[0, 100]}
          justifyContent={['space-between', 'flex-start']}
        >
          <Box>
            <Box width="100%" color="gray.500">
              Status
            </Box>
            {!isLoading ? (
              <Box width="100%">{handleStatus()}</Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              {`${acc?.acc_type.unity_of_measurement.name}s` || 'Horas'}
            </Box>
            {!isLoading ? (
              <Box width="100%">{acc?.quantity}</Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              Pontos
            </Box>
            {!isLoading ? (
              <Box width="100%">{pontos}</Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>
        </Stack>

        <Box>
          <Box width="100%" color="gray.500">
            Descrição
          </Box>
          {!isLoading ? (
            <Box width="100%">{acc?.description}</Box>
          ) : (
            <SkeletonText noOfLines={1} />
          )}
        </Box>

        {acc?.acc_status.id === ACC_STATUS.APPROVED ||
          (acc?.acc_status.id === ACC_STATUS.FAILED && (
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
                <Box width="100%">
                  {new Date(acc?.acc_assessment.created_at).toLocaleString()}
                </Box>
              </Box>
            </SimpleGrid>
          ))}

        {acc?.acc_status.id === ACC_STATUS.FAILED && (
          <Box>
            <Box width="100%" color="gray.500">
              Motivo da Reprovação
            </Box>
            <Box width="100%">{acc?.acc_assessment.description}</Box>
          </Box>
        )}

        <Box display="flex" justifyContent="center">
          <DownloadButton
            fileUrl={acc?.certificate_url || ''}
            filename={acc?.certificate || ''}
            label="Baixar Certificado"
          />
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
              <p>Tem certeza que deseja excluir a ACC?</p>
              {acc?.acc_status.id === ACC_STATUS.APPROVED && (
                <p>
                  A pontuação obtida nessa ACC será retirada da sua contagem
                  total de pontos.
                </p>
              )}
              <p>Essa ação não pode ser desfeita.</p>
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
