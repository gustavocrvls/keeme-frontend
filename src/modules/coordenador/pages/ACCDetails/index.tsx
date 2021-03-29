import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import {
  Box,
  Button,
  Stack,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  SkeletonText,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';

import STATUS_DA_ACC from '../../../../constants/StatusDaACC';
import api from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from '../../../../components/Notifications';
import { IACCWithUser, ParamTypes } from './dtos';
import PageTitle from '../../../../components/PageTitle';
import { USERID_KEY } from '../../../../services/auth';

export function ACCDetails(): JSX.Element {
  const [acc, setACC] = useState<IACCWithUser>();
  const [description, setDescription] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [isAlertApproveOpen, setIsAlertApproveOpen] = useState<boolean>(false);
  const [isModalAvaliacaoOpen, setIsModalAssessmentOpen] = useState<boolean>(
    false,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cancelRef = useRef<any>();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const { id } = useParams<ParamTypes>();
  const history = useHistory();

  async function handleAssessment(status: number) {
    if (status === STATUS_DA_ACC.APROVADA) {
      try {
        await api.put(`accs/update/${id}/status`, {
          new_status: status,
        });
        notifySuccess('A ACC foi aprovada!');
        history.goBack();
      } catch (err) {
        notifyError('Não foi possível avaliar a ACC :(');
      }
    }
    if (status === STATUS_DA_ACC.NEGADA) {
      try {
        if (!description.length) {
          notifyWarning('É necessário especificar o motivo da negação');
        }
        await api.post(`avaliacoes-das-accs`, {
          descricao: description,
          status_da_acc: status,
          usuario: sessionStorage.getItem(USERID_KEY),
          acc: id,
        });
        notifySuccess('A ACC foi reprovada!');
        history.goBack();
      } catch {
        notifyError('Não foi possível avaliar a ACC :(');
      }
    }
  }

  function handleStatus() {
    switch (acc?.status_da_acc.id) {
      case STATUS_DA_ACC.APROVADA:
        return (
          <strong style={{ color: 'teal' }}>{acc.status_da_acc.nome}</strong>
        );

      case STATUS_DA_ACC.EM_ANALISE:
        return (
          <strong style={{ color: 'gray' }}>{acc.status_da_acc.nome}</strong>
        );

      case STATUS_DA_ACC.NEGADA:
        return (
          <strong style={{ color: 'tomato' }}>{acc.status_da_acc.nome}</strong>
        );
      default:
        return <></>;
    }
  }

  async function loadACCDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`accs/${id}`);
      setACC(response.data);
      setPoints(
        response.data.quantidade *
          response.data.variante_de_acc.pontos_por_unidade,
      );
    } catch (error) {
      notifyError('Não foi possível carregar os detalhes da ACC :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadACCDetails();
  }, []);

  return (
    <>
      <PageTitle>Detalhes da ACC</PageTitle>

      <Stack spacing="5" marginTop="5">
        <Box>
          <Box width="100%" color="gray.500">
            Discente
          </Box>
          {!isLoading ? (
            <>
              <Box width="100%">{acc?.usuario.nome}</Box>
            </>
          ) : (
            <SkeletonText noOfLines={1} />
          )}
        </Box>

        <Box>
          <Box width="100%" color="gray.500">
            Tipo de ACC
          </Box>
          {!isLoading ? (
            <>
              {acc?.variante_de_acc.descricao ? (
                <Box width="100%">
                  {`${acc?.tipo_de_acc.nome} (${
                    acc?.variante_de_acc.descricao || ''
                  })`}
                </Box>
              ) : (
                <Box width="100%">{`${acc?.tipo_de_acc.nome}`}</Box>
              )}
            </>
          ) : (
            <SkeletonText />
          )}
        </Box>

        {acc?.criado_em && (
          <Box>
            <Box width="100%" color="gray.500">
              Criada em
            </Box>
            {!isLoading ? (
              <Box width="100%">
                {new Date(acc?.criado_em).toLocaleString()}
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
              {`${acc?.tipo_de_acc.unidade_de_medida.nome}s` || 'Horas'}
            </Box>
            {!isLoading ? (
              <Box width="100%">{acc?.quantidade}</Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              Pontos
            </Box>
            {!isLoading ? (
              <Box width="100%">{points}</Box>
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
            <Box width="100%">{acc?.descricao}</Box>
          ) : (
            <SkeletonText noOfLines={1} />
          )}
        </Box>
      </Stack>
      <Flex marginTop="5" justifyContent="center">
        <Button
          colorScheme="gray"
          leftIcon={<FiDownload />}
          onClick={() => downloadRef.current?.click()}
        >
          Baixar Certificado
        </Button>
      </Flex>
      <a
        style={{ visibility: 'hidden' }}
        href={`${process.env.REACT_APP_API}/certificados/${acc?.certificado.id}`}
        ref={downloadRef}
      >
        baixar
      </a>

      <Stack spacing="3" justifyContent="center" direction="row">
        <Button
          colorScheme="red"
          onClick={() => setIsModalAssessmentOpen(true)}
        >
          Reprovar
        </Button>
        <Button colorScheme="teal" onClick={() => setIsAlertApproveOpen(true)}>
          Aprovar
        </Button>
      </Stack>

      <AlertDialog
        isOpen={isAlertApproveOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertApproveOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Aprovar ACC
            </AlertDialogHeader>

            <AlertDialogBody>
              <p>Deseja realmente aprovar essa ACC?</p>
              <p>Essa ação não pode ser desfeita.</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsAlertApproveOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => {
                  handleAssessment(STATUS_DA_ACC.APROVADA);
                }}
                ml={3}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        isOpen={isModalAvaliacaoOpen}
        onClose={() => setIsModalAssessmentOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Motivo da Reprovação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Motivo da Reprovação"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              variant="ghost"
              mr={3}
              onClick={() => setIsModalAssessmentOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleAssessment(STATUS_DA_ACC.NEGADA)}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
