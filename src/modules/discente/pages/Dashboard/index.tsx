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
  points: number;
  quantity: number;
  description: string;
  acc_status: {
    id: number;
    name: string;
  };
  acc_type: {
    id: number;
    name: string;
    unity_of_measurement: {
      id: number;
      name: string;
    };
  };
  acc_variant: {
    id: number;
    description: string;
    points_per_unity: number;
  };
}

export default function Home(): JSX.Element {
  const [progress, setProgress] = useState(0);
  const [lastACCs, setLastACCs] = useState<Array<IACC>>([]);
  const [summary, setSummary] = useState({
    approved_points: 0,
    under_analysis: 0,
    failed_points: 0,
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoadingData(true);
      try {
        const response = await api.get(
          `points/${sessionStorage.getItem(USERID_KEY)}`,
        );

        const userProgress = Number(
          (100 * response.data.approved_points) / 51,
        ).toFixed(0);

        setProgress(Number(userProgress));

        setSummary(response.data);

        const responseACCs = await api.get(`accs`, {
          params: {
            user: sessionStorage.getItem(USERID_KEY),
            sortField: 'created_at',
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
                {summary.approved_points}
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
                    {summary.approved_points}
                    pts
                  </strong>
                </li>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Em análise: </span>
                  <strong>
                    {summary.under_analysis}
                    pts
                  </strong>
                </li>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Negadas: </span>
                  <strong>
                    {summary.failed_points}
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
                  title={acc.acc_type.name}
                  accType={acc.acc_type}
                  points={acc.acc_variant.points_per_unity * acc.quantity}
                  quantity={acc.quantity}
                  status={acc.acc_status}
                />
              </ListItem>
            );
          return <></>;
        })}
      </UnorderedList>
    </>
  );
}
