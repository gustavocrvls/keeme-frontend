import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Skeleton,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import api from '../../../../services/api';
import { ACCTypesList } from './components/ACCTypesList';
import { IACCType } from './dtos';

export function ACCTypes(): JSX.Element {
  const [accTypes, setACCTypes] = useState<IACCType[]>([]);
  const [accTypeToBeDeleted, setACCTypeToBeDeleted] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const history = useHistory();

  async function loadData(): Promise<void> {
    try {
      setIsLoading(true);

      const response = await api.get('/acc-types', {
        params: {
          page: 2,
          limit: 3,
        },
      });
      setACCTypes(response.data.data);
    } catch (err) {
      notifyError('Não foi possível carregar os tipos de ACC :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

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
      <Flex justifyContent="space-between" alignItems="center" marginBottom="5">
        <Heading as="h1">Tipos de ACC</Heading>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push('/administrator/acc-types/new')}
        >
          Cadastrar novo
        </Button>
      </Flex>

      <ACCTypesList
        accTypes={accTypes}
        isLoading={isLoading}
        editACCType={(id: number) => {
          history.push(`/administrator/acc-types/update/${id}`);
        }}
        deleteACCType={(id: number) => handleACCTypeToBeDeleted(id)}
      />

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setACCTypeToBeDeleted(0)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Tipo de ACC
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o tipo de ACC? Essa ação não pode
              ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setIsAlertOpen(false);
                  setACCTypeToBeDeleted(0);
                }}
              >
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={deleteACCType} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
