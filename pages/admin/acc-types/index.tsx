/* eslint-disable prettier/prettier */
import {
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  notifyError,
  notifySuccess,
} from '../../../components/Notifications';
import { PageTitle } from '../../../components/PageTitle';
import { Pagination } from '../../../components/Pagination';
import { api } from '../../../services/api';
import { ACCTypesList } from './components/ACCTypesList';
import { AlertDeleteACCType } from './components/AlertDeleteACCType';
import { IACCType } from './dtos';

export function ACCTypes(): JSX.Element {
  const [accTypes, setACCTypes] = useState<IACCType[]>([]);
  const [accTypeToBeDeleted, setACCTypeToBeDeleted] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();

  async function loadData(): Promise<void> {
    try {
      setIsLoading(true);

      const response = await api.get('/acc-types', {
        params: {
          page: currentPage,
          limit: 5,
          sortField: 'name',
          sortOrder: 'ASC'
        },
      });
      setTotalPages(response.data.total_pages);
      setACCTypes(response.data.data);
    } catch (err) {
      notifyError('Não foi possível carregar os tipos de ACC :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [currentPage]);

  function handleACCTypeToBeDeleted(id: number): void {
    setACCTypeToBeDeleted(id);
    setIsAlertOpen(true);
  }

  async function deleteACCType(): Promise<void> {
    try {
      await api.delete(`acc-types/${accTypeToBeDeleted}`);

      const newACCTypes = accTypes.filter(
        accType => accType.id !== accTypeToBeDeleted,
      );

      setACCTypes(newACCTypes);

      notifySuccess('O tipo de ACC foi excluído!');
    } catch (err) {
      notifyError('Não foi possível excluir o tipo de ACC :(');
    } finally {
      setIsAlertOpen(false);
      setACCTypeToBeDeleted(0);
    }
  }

  return (
    <div>
      <PageTitle
        actions={(
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => router.push('/administrator/acc-types/new')}
          >
            Cadastrar novo
          </Button>
        )}
      >
        Tipos de ACC
      </PageTitle>

      <ACCTypesList
        accTypes={accTypes}
        isLoading={isLoading}
        editACCType={(id: number) => {
          router.push(`/administrator/acc-types/update/${id}`);
        }}
        deleteACCType={(id: number) => handleACCTypeToBeDeleted(id)}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <AlertDeleteACCType
        deleteACCType={deleteACCType}
        isAlertOpen={isAlertOpen}
        setACCTypeToBeDeleted={setACCTypeToBeDeleted}
        setIsAlertOpen={setIsAlertOpen}
      />
    </div>
  );
}
