/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { FiDownload, FiEdit, FiTrash } from 'react-icons/fi';

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, SimpleGrid, Stack, Tooltip } from '@chakra-ui/react';
import STATUS_DA_ACC from '../../../../constants/StatusDaACC';
import api from '../../../../services/api';
import PageTitle from '../../../../components/PageTitle';
import { notifyError, notifySuccess } from '../../../../components/Notifications';

interface IAcc {
  id: number;
  id_certificado: number;
  pontos: number;
  quantidade: number;
  descricao: string;
  criado_em: Date;
  status_da_acc: {
    id: number;
    nome: string;
  };
  tipo_de_acc: {
    id: number;
    nome: string;
    unidade_de_medida: {
      id: number;
      nome: string;
    };
  };
  avaliacao_da_acc: {
    id: number;
    criado_em: Date;
    descricao: string;
    usuario: {
      id: number;
      nome: string;
    };
  };
  variante_de_acc: {
    id: number,
    descricao: string,
    pontos_por_unidade: number
  };
}
interface ParamTypes {
  id: string;
}

export function DetalhesDaAcc(): JSX.Element {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [acc, setACC] = useState<IAcc>();
  const [pontos, setPontos] = useState<number>(0);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState<boolean>(false);
  const cancelRef = useRef<any>();

  const history = useHistory();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    async function loadACC() {
      try {
        const response = await api.get(`accs/${id}`);
        setACC(response.data);

        setPontos(response.data.quantidade * response.data.variante_de_acc.pontos_por_unidade)

      } catch (err) {
        notifyError('Não foi possível carregar os dados :(')
      }
    }
    loadACC();
  }, []);

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
        backTo="/discente/minhas-accs"
        actions={(
          <>
            <Tooltip label="Editar" aria-label="Editar" hasArrow>
              <IconButton aria-label="edit" icon={<FiEdit />} />
            </Tooltip>
            <Tooltip label="Excluir" aria-label="Excluir" hasArrow>
              <IconButton colorScheme="red" aria-label="delete" icon={<FiTrash />} onClick={() => setIsAlertDeleteOpen(true)} />
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
            acc?.variante_de_acc.descricao
            ?
              <Box width="100%">{`${acc?.tipo_de_acc.nome} (${acc?.variante_de_acc.descricao || ''})`}</Box>
            :
              <Box width="100%">{`${acc?.tipo_de_acc.nome}`}</Box>
          }
        </Box>

        {
          acc?.criado_em && (
          <Box>
            <Box width="100%" color="gray.500">
              Criada em
            </Box>
            <Box width="100%">{new Date(acc?.criado_em).toLocaleString()}</Box>
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
            <Box width="100%">{handleStatus()}</Box>
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              {`${acc?.tipo_de_acc.unidade_de_medida.nome}s`}
            </Box>
            <Box width="100%">{acc?.quantidade}</Box>
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              Pontos
            </Box>
            <Box width="100%">{pontos}</Box>
          </Box>
        </Stack>

        <Box>
          <Box width="100%" color="gray.500">
            Descrição
          </Box>
          <Box width="100%">{acc?.descricao}</Box>
        </Box>

        {acc?.status_da_acc.id === STATUS_DA_ACC.APROVADA ||
          (acc?.status_da_acc.id === STATUS_DA_ACC.NEGADA && (
            <SimpleGrid columns={[1, 2]}>
              <Box>
                <Box width="100%" color="gray.500">
                  Avaliada por
                </Box>
                <Box width="100%">{acc?.avaliacao_da_acc.usuario.nome}</Box>
              </Box>
              <Box>
                <Box width="100%" color="gray.500">
                  Data da Avaliação
                </Box>
                <Box width="100%">{new Date(acc?.avaliacao_da_acc.criado_em).toLocaleString()}</Box>
              </Box>
            </SimpleGrid>
          ))}

        {acc?.status_da_acc.id === STATUS_DA_ACC.NEGADA && (
          <Box>
            <Box width="100%" color="gray.500">
              Motivo da Reprovação
            </Box>
            <Box width="100%">{acc?.avaliacao_da_acc.descricao}</Box>
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
            href={`${process.env.REACT_APP_API}/certificados/${acc?.id_certificado}`}
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
                acc?.status_da_acc.id === STATUS_DA_ACC.APROVADA &&
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
