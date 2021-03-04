import React, { useEffect, useState } from 'react';
import { FiFile, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import ProgressRing from '../../../components/ProgressRing';
import { CardAcc } from './DetalhesDaPontuacao';
import api from '../../../services/api';
import { USERID_KEY } from '../../../services/auth';

interface Acc {
  id: number;
  pontos: number;
  quantidade: number;
  sobre: string;
  statusDaAcc: {
    id: number;
    nome: string;
  };
  tipoDeAcc: {
    id: number;
    nome: string;
    unidadeDeMedida: {
      id: number;
      nome: string;
    };
  };
}

interface IProps {}

interface IResumoDaPontuacao {
  pontosAprovados: number;
  pontosEmAnalise: number;
  pontosNegados: number;
}

export default function Home(): JSX.Element {
  const [progress, setProgress] = useState(0);
  const [lastACCs, setLastACCs] = useState<Array<Acc>>([]);
  const [resumo, setResumo] = useState({
    pontosAprovados: 0,
    pontosEmAnalise: 0,
    pontosNegados: 0,
  });

  useEffect(() => {
    async function loadData() {
      const response = await api.get(
        `accs/user/${sessionStorage.getItem(USERID_KEY)}/completo`,
      );

      const userProgress = Number(
        (100 * response.data.resumo.pontosAprovados) / 51,
      ).toFixed(0);

      setProgress(Number(userProgress));

      const accs = response.data.accs.map((acc: any) => {
        return {
          id: acc.id,
          idCertificado: acc.id_certificado,
          pontos: acc.pontos,
          quantidade: acc.quantidade,
          sobre: acc.sobre,
          statusDaAcc: acc.status_da_acc,
          tipoDeAcc: {
            id: acc.tipo_de_acc.id,
            nome: acc.tipo_de_acc.nome,
            unidadeDeMedida: acc.tipo_de_acc.unidade_de_medida,
          },
        };
      });

      setResumo(response.data.resumo);
      setLastACCs(accs);
    }
    loadData();
  }, []);

  return (
    <>
      <Heading as="h1" size="lg">
        Início
      </Heading>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={4}
        h="280px"
        marginBottom="5"
      >
        <GridItem
          rowSpan={1}
          colSpan={3}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          padding="4"
        >
          <Flex justifyContent="space-between">
            <ProgressRing stroke={10} radius={60} progress={progress}>
              {resumo.pontosAprovados}
              /51
            </ProgressRing>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
              }}
            >
              <ul style={{ listStyle: 'none' }}>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Aprovadas: </span>
                  <strong>
                    {resumo.pontosAprovados}
                    pts
                  </strong>
                </li>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Em análise: </span>
                  <strong>
                    {resumo.pontosEmAnalise}
                    pts
                  </strong>
                </li>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Negadas: </span>
                  <strong>
                    {resumo.pontosNegados}
                    pts
                  </strong>
                </li>
              </ul>
            </div>
          </Flex>
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={1}
          _hover={{ backgroundColor: '#f1f3f5' }}
        >
          <Link
            to="/discente/cadastrar-acc"
            color="primary"
            style={{ width: '30%', textDecoration: 'none' }}
          >
            <Flex
              boxShadow="md"
              borderRadius="md"
              height="100%"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box>
                <FiPlus />
              </Box>
              <div>Nova Acc</div>
            </Flex>
          </Link>
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={1}
          _hover={{ backgroundColor: '#f1f3f5' }}
        >
          <Link
            to="/discente/minhas-accs"
            color="primary"
            style={{ width: '30%', textDecoration: 'none' }}
          >
            <Flex
              boxShadow="md"
              borderRadius="md"
              height="100%"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box>
                <FiFile />
              </Box>
              <Box>Minhas ACCs</Box>
            </Flex>
          </Link>
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={1}
          _hover={{ backgroundColor: '#f1f3f5' }}
        >
          <Link
            to="/discente/tipos-de-acc"
            color="primary"
            style={{ width: '30%', textDecoration: 'none' }}
          >
            <Flex
              boxShadow="md"
              borderRadius="md"
              height="100%"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box>
                <FiFile />
              </Box>
              <Box>Tipos de ACC</Box>
            </Flex>
          </Link>
        </GridItem>
      </Grid>

      <Heading as="h1" size="md">
        Últimos Envios
      </Heading>

      <ul className="card-list">
        {lastACCs.map((acc, index) => (
          <>
            {index <= 3 ? (
              <li key={acc.id} className="card-list-item">
                <CardAcc
                  id={acc.id}
                  pontos={acc.pontos}
                  quantidade={acc.quantidade}
                  statusDaAcc={acc.statusDaAcc}
                  tipoDeAcc={acc.tipoDeAcc}
                />
              </li>
            ) : (
              <></>
            )}
          </>
        ))}
      </ul>
    </>
  );
}
