/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { FiFile, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  ListItem,
  SkeletonCircle,
  UnorderedList,
} from '@chakra-ui/react';
import ProgressRing from '../../../../components/ProgressRing';
import api from '../../../../services/api';
import { USERID_KEY } from '../../../../services/auth';
import { notifyError } from '../../../../components/Notifications';
import { ACCCard } from '../MinhasACCs/components/ACCCard';

interface IACC {
  id: number;
  id_certificado: number;
  pontos: number;
  quantidade: number;
  descricao: string;
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
  variante_de_acc: {
    id: number;
    descricao: string;
    pontos_por_unidade: number;
  };
}

export default function Home(): JSX.Element {
  const [progress, setProgress] = useState(0);
  const [lastACCs, setLastACCs] = useState<Array<IACC>>([]);
  const [resumo, setResumo] = useState({
    pontosAprovados: 0,
    pontosEmAnalise: 0,
    pontosNegados: 0,
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoadingData(true);
      try {
        const response = await api.get(
          `accs/user/${sessionStorage.getItem(USERID_KEY)}/completo`,
        );

        const userProgress = Number(
          (100 * response.data.resumo.pontosAprovados) / 51,
        ).toFixed(0);

        setProgress(Number(userProgress));

        setResumo(response.data.resumo);

        const responseACCs = await api.get(`accs`, {
          params: {
            usuario: sessionStorage.getItem(USERID_KEY),
            sortField: 'criado_em',
            sortOrder: 'DESC',
            limit: 3,
            page: 1,
          },
        });

        setLastACCs(responseACCs.data.data);
      } catch (err) {
        notifyError(
          'Não foi possível carregar os dados, por favor, regarregue a tela!',
        );
      } finally {
        setIsLoadingData(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Heading as="h1" size="lg" marginBottom="5">
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
            {isLoadingData ? (
              <SkeletonCircle size="25" />
            ) : (
              <ProgressRing stroke={10} radius={60} progress={progress}>
                {resumo.pontosAprovados}
                /51
              </ProgressRing>
            )}

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
              <div>Cadastrar ACC</div>
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

      <Heading as="h2" size="md" marginBottom="5">
        Últimos Envios
      </Heading>

      <UnorderedList styleType="none" margin="0">
        {lastACCs.map((acc, index) => {
          if (index <= 3)
            return (
              <ListItem key={acc.id} marginBottom="3">
                <ACCCard
                  id={acc.id}
                  title={acc.tipo_de_acc.nome}
                  description={acc.descricao}
                  accType={acc.tipo_de_acc}
                  points={
                    acc.variante_de_acc.pontos_por_unidade * acc.quantidade
                  }
                  quantity={acc.quantidade}
                  status={acc.status_da_acc}
                />
              </ListItem>
            );
          return <></>;
        })}
      </UnorderedList>
    </>
  );
}
