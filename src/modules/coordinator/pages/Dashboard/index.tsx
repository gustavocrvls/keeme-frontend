import { Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { notifyError } from '../../../../components/Notifications';
import { ACC_STATUS } from '../../../../constants/ACCStatus';
import { api } from '../../../../services/api';
import { USER_COURSE_KEY } from '../../../../services/auth';
import { ReceivedACCsList } from './components/ReceivedACCsList';
import { IReceivedACC } from './dtos';

export function Dashboard(): JSX.Element {
  const [accs, setACCs] = useState<IReceivedACC[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  async function loadACCs(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get(`accs/`, {
        params: {
          acc_status: ACC_STATUS.UNDER_ANALYSIS,
          course: sessionStorage.getItem(USER_COURSE_KEY),
          page: currentPage,
          limit: 10,
          sortField: 'created_at',
          sortOrder: 'DESC',
        },
      });

      setACCs(response.data.data);
    } catch (err) {
      notifyError('Não foi possível carregar as ACCs recebidas :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadACCs();
  }, []);
  return (
    <div>
      <Heading as="h1" size="lg" marginBottom="5">
        Início
      </Heading>

      <Heading as="h2" size="md" marginBottom="5">
        ACCs Recebidas
      </Heading>

      {!accs.length && !isLoading ? (
        <Text color="gray.600">Não há ACCs para serem avaliadas</Text>
      ) : (
        <ReceivedACCsList accs={accs} isLoading={isLoading} />
      )}
    </div>
  );
}
