/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { FiCircle, FiDownload, FiXCircle, FiCheckCircle } from 'react-icons/fi';

import { Box, Button, Stack } from '@chakra-ui/react';
import statusDaAccConsts from '../../../../constants/statusDaAcc';
import api from '../../../../services/api';
import PageTitle from '../../../../components/PageTitle';

interface IAcc {
  id: number;
  id_certificado: number;
  pontos: number;
  quantidade: number;
  sobre: string;
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
}

interface IStatus {
  id: number;
  nome: string;
}

interface ParamTypes {
  id: string;
}

export function DetalhesDaAcc(): JSX.Element {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [acc, setACC] = useState<IAcc>();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    async function loadACC() {
      const response = await api.get(`accs/${id}`);
      setACC(response.data);
    }
    loadACC();
  }, []);

  function handleStatusColor(status?: IStatus): JSX.Element {
    let color = '';
    let Icon = <></>;
    if (status)
      switch (status.id) {
        case statusDaAccConsts.EM_ANALISE:
          color = '#8FA7B2';
          Icon = <FiCircle style={{ marginRight: 5 }} />;
          break;
        case statusDaAccConsts.APROVADA:
          color = '#31878C';
          Icon = <FiCheckCircle style={{ marginRight: 5 }} />;
          break;
        case statusDaAccConsts.NEGADA:
          color = '#DE4079';
          Icon = <FiXCircle style={{ marginRight: 5 }} />;
          break;

        default:
          break;
      }

    return (
      <span
        style={{
          fontSize: 12,
          backgroundColor: color,
          padding: '2px 5px',
          color: '#fff',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          width: 120,
          justifyContent: 'center',
        }}
      >
        {Icon}
        {status?.nome}
      </span>
    );
  }

  return (
    <>
      <PageTitle backTo="/discente/minhas-accs">Detalhes da Acc</PageTitle>

      <Stack spacing="5" marginTop="5">
        <Box>
          <Box width="100%" color="gray.500">
            Tipo de ACC
          </Box>
          <Box width="100%">{acc?.tipo_de_acc.nome}</Box>
        </Box>

        <Stack
          direction="row"
          spacing={[0, 18, 20]}
          justifyContent={['space-between', 'flex-start']}
        >
          <Box>
            <Box width="100%" color="gray.500">
              Status
            </Box>
            <Box width="100%">{handleStatusColor(acc?.status_da_acc)}</Box>
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              {`${acc?.tipo_de_acc.unidade_de_medida.nome}s`}
            </Box>
            <Box width="100%">{acc?.quantidade}</Box>
          </Box>

          <Box>
            <Box width="100%" color="gray.500">
              Pontuação
            </Box>
            <Box width="100%">{acc?.pontos}</Box>
          </Box>
        </Stack>

        <Box>
          <Box width="100%" color="gray.500">
            Descrição
          </Box>
          <Box width="100%">{acc?.sobre}</Box>
        </Box>

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
    </>
  );
}

export default withRouter(DetalhesDaAcc);
