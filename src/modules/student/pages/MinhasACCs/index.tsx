import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ListItem,
  Skeleton,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../../services/api';
import { USERID_KEY } from '../../../../services/auth';
import PageTitle from '../../../../components/PageTitle';
import { ACCCard } from './components/ACCCard';
import { notifyError } from '../../../../components/Notifications';
import { Pagination } from '../../../../components/Pagination';

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

export default function MinhasACCs(): JSX.Element {
  const [accs, setACCs] = useState<IACC[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const history = useHistory();

  async function loadACCs(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get(`accs`, {
        params: {
          user: sessionStorage.getItem(USERID_KEY),
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
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   loadACCs();
  // }, []);

  useEffect(() => {
    loadACCs();
  }, [currentPage]);

  return (
    <>
      <PageTitle>Minhas ACCs</PageTitle>
      {!isLoading ? (
        <UnorderedList marginLeft="0" styleType="none">
          {accs.length > 0 ? (
            <>
              {accs.map(acc => (
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
              ))}
            </>
          ) : (
            <>
              <Box color="gray.500">
                Que vazio! Que tal começar cadastrando uma
                <Button
                  variant="link"
                  marginLeft="1"
                  textDecoration="underline"
                  onClick={() => {
                    history.push('new-acc');
                  }}
                >
                  {` Nova ACC?`}
                </Button>
              </Box>
            </>
          )}
        </UnorderedList>
      ) : (
        <Stack spacing="3">
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
        </Stack>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
