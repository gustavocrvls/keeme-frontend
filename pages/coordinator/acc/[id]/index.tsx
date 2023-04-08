import { useEffect, useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
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

import { ACC_STATUS } from '../../../../constants/ACCStatus';
import { api } from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from '../../../../components/Notifications';
import { IACCWithUser, ParamTypes } from './dtos';
import { PageTitle } from '../../../../components/PageTitle';
import { USERID_KEY } from '../../../../services/auth';
import { useRouter } from 'next/router';

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

  const router = useRouter();
  const { id } = router.query;

  async function handleAssessment(status: number) {
    if (status === ACC_STATUS.APPROVED) {
      try {
        await api.post(`accs-assessments`, {
          acc_status: status,
          user: sessionStorage.getItem(USERID_KEY),
          acc: id,
        });
        notifySuccess('A ACC foi aprovada!');
        history.back();
      } catch (err) {
        notifyError('Não foi possível avaliar a ACC :(');
      }
    }
    if (status === ACC_STATUS.FAILED) {
      try {
        if (!description.length) {
          notifyWarning('É necessário especificar o motivo da negação');
        }
        await api.post(`accs-assessments`, {
          description,
          acc_status: status,
          user: sessionStorage.getItem(USERID_KEY),
          acc: id,
        });
        notifySuccess('A ACC foi reprovada!');
        history.back();
      } catch {
        notifyError('Não foi possível avaliar a ACC :(');
      }
    }
  }

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

  async function loadACCDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`accs/${id}`);
      setACC(response.data);
      setPoints(
        response.data.quantity * response.data.acc_variant.points_per_unity,
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
              <Box width="100%">{acc?.user.name}</Box>
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
              {acc?.acc_variant.description ? (
                <Box width="100%">
                  {`${acc?.acc_type.name} (${acc?.acc_variant.description || ''
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
      </Stack>

      {!isLoading && (
        <Flex marginTop="5" justifyContent="center">
          <Button
            colorScheme="gray"
            leftIcon={<FiDownload />}
            onClick={() => downloadRef.current?.click()}
          >
            Baixar Certificado
          </Button>
        </Flex>
      )}
      <a
        style={{ visibility: 'hidden' }}
        href={`${process.env.REACT_APP_API}/certificates/${acc?.certificate.id}`}
        ref={downloadRef}
      >
        baixar
      </a>

      {acc?.acc_status.id === ACC_STATUS.APPROVED ||
        acc?.acc_status.id === ACC_STATUS.FAILED ||
        isLoading ? (
        <></>
      ) : (
        <Stack spacing="3" justifyContent="center" direction="row">
          <Button
            colorScheme="red"
            onClick={() => setIsModalAssessmentOpen(true)}
          >
            Reprovar
          </Button>
          <Button
            colorScheme="teal"
            onClick={() => setIsAlertApproveOpen(true)}
          >
            Aprovar
          </Button>
        </Stack>
      )}

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
                  handleAssessment(ACC_STATUS.APPROVED);
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
            <p>Deseja realmente aprovar essa ACC?</p>
            <p>Essa ação não pode ser desfeita.</p>
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
              onClick={() => handleAssessment(ACC_STATUS.FAILED)}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
