import { useEffect, useState } from 'react';
import { ListItem, Skeleton, Stack, UnorderedList } from '@chakra-ui/react';
import { PageTitle } from 'components/PageTitle';
import { USERID_KEY } from 'services/auth';
import { api } from 'services/api';
import { ACCTypeCard } from './components/ACCTypeCard';
import { notifyError } from 'components/Notifications';
import { Pagination } from 'components/Pagination';
import { ACCType } from './dtos';

export function ACCTypes(): JSX.Element {
  const [accTypes, setACCTypes] = useState<Array<ACCType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  async function loadData(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get(
        `acc-types/user/${sessionStorage.getItem(USERID_KEY)}`,
        {
          params: {
            limit: 5,
            page: currentPage,
          },
        },
      );

      setACCTypes(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      notifyError('Não foi possível carregar as informações :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [currentPage]);

  return (
    <>
      <PageTitle>Tipos de ACC</PageTitle>

      {!isLoading ? (
        <UnorderedList margin="0" listStyleType="none">
          {accTypes.map(type => (
            <ListItem marginBottom="3" key={type.id}>
              <ACCTypeCard
                name={type.name}
                limit={type.point_limit}
                completed={type.approved_points}
                measurementUnity={type.unit_of_measurement.name}
                variants={type.acc_variants}
                description={type.description}
              />
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Stack spacing="3">
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
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
