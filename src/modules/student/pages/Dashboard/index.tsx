import { useEffect, useState } from 'react';
import { FiFile, FiPackage, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { api } from '../../../../services/api';
import { USERID_KEY } from '../../../../services/auth';
import { notifyError } from '../../../../components/Notifications';
import { IACC, IPoints } from './dtos';
import { LastSends } from './components/LastSends';
import { StudentPoints } from '../../../../components/StudentPoints';

export default function Home(): JSX.Element {
  const [progress, setProgress] = useState(0);
  const [lastACCs, setLastACCs] = useState<Array<IACC>>([]);
  const [summary, setSummary] = useState<IPoints>({
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
          <StudentPoints
            isLoading={isLoadingData}
            progress={progress}
            summary={summary}
          />
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={1}
          _hover={{ backgroundColor: '#f1f3f5' }}
        >
          <Link
            to="/student/new-acc"
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
            to="/student/accs"
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
            to="/student/acc-types"
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
                <FiPackage />
              </Box>
              <Box>Tipos de ACC</Box>
            </Flex>
          </Link>
        </GridItem>
      </Grid>

      <LastSends accs={lastACCs} isLoading={isLoadingData} />
    </>
  );
}
