import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, SkeletonText } from '@chakra-ui/react';
import { api } from '../../../../services/api';
import { notifyError } from '../../../../components/Notifications';
import { IStudent, IACC, ParamTypes, ISummary } from './dtos';
import { PageTitle } from '../../../../components/PageTitle';
import { ACCList } from './components/ACCList';
import { Pagination } from '../../../../components/Pagination';
import { StudentPoints } from '../../../../components/StudentPoints';

export function StudentDetails(): JSX.Element {
  const [student, setStudent] = useState<IStudent>();
  const [summary, setSummary] = useState<ISummary>({
    approved_points: 0,
    under_analysis: 0,
    failed_points: 0,
  });
  const [progress, setProgress] = useState(0);
  const [accs, setACCs] = useState<IACC[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingACCs, setIsLoadingACCs] = useState(false);

  const { id } = useParams<ParamTypes>();

  async function loadUserData() {
    try {
      setIsLoadingData(true);
      const studentResponse = await api.get(`users/${id}`);
      const pointsResponse = await api.get(`points/${id}`);

      const studentProgress = Number(
        (100 * pointsResponse.data.approved_points) / 51,
      ).toFixed(0);

      setStudent(studentResponse.data);
      setSummary(pointsResponse.data);
      setProgress(Number(studentProgress));
    } catch (err) {
      notifyError('Não foi possível carregar o discente :(');
    } finally {
      setIsLoadingData(false);
    }
  }

  async function loadACCs(): Promise<void> {
    try {
      setIsLoadingACCs(true);
      const response = await api.get(`accs`, {
        params: {
          user: id,
          limit: 5,
          page: currentPage,
          sortField: 'acc_status',
          sortOrder: 'ASC',
        },
      });
      setACCs(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      notifyError('Não foi possível carregar as ACCs.');
    } finally {
      setIsLoadingACCs(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    loadACCs();
  }, [currentPage]);

  return (
    <div>
      <PageTitle>Detalhes do Discente</PageTitle>
      <Flex
        backgroundColor="white"
        borderRadius="md"
        boxShadow="md"
        padding="3"
        marginBottom="5"
        justifyContent="space-between"
        direction={['column', 'row']}
      >
        <Box>
          <Box>
            <Box width="100%" color="gray.500">
              Nome
            </Box>
            {!isLoadingData ? (
              <Box width="100%">{student?.name}</Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>
          <Box>
            <Box width="100%" color="gray.500">
              CPF
            </Box>
            {!isLoadingData ? (
              <Box width="100%">{student?.cpf}</Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>
          <Box>
            <Box width="100%" color="gray.500">
              E-mail
            </Box>
            {!isLoadingData ? (
              <Box width="100%">{student?.email}</Box>
            ) : (
              <SkeletonText noOfLines={1} />
            )}
          </Box>
        </Box>
        <Box>
          <StudentPoints
            isLoading={isLoadingData}
            progress={progress}
            summary={summary}
          />
        </Box>
      </Flex>

      <ACCList isLoading={isLoadingACCs} accs={accs} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
