/* eslint-disable react/no-unescaped-entities */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import PERFIS from '../../../../constants/Perfis';
import api from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { ICourse } from './dtos';

export function Dashboard(): JSX.Element {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isAlertDeleteUserOpen, setIsAlertDeleteUserOpen] = useState<boolean>(
    false,
  );
  const [userToBeDeleted, setUserToBeDeleted] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = useRef<any>(null);

  const history = useHistory();

  async function loadData(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get(
        `users/perfil/${PERFIS.COORDENADOR}/cursos`,
      );
      setCourses(response.data.cursos);
    } catch (err) {
      notifyError('Não foi possível carregar os dados :(');
    } finally {
      setIsLoading(false);
    }
  }

  function handleUserToBeDeleted(userId: number): void {
    setUserToBeDeleted(userId);
    setIsAlertDeleteUserOpen(true);
  }

  async function deleteUser(): Promise<void> {
    try {
      await api.delete(`users/${userToBeDeleted}`);

      const coursesState = courses;

      let newCourses = coursesState.map(course => {
        return {
          ...course,
          usuarios: course.users.filter(user => user.id !== userToBeDeleted),
        };
      });

      newCourses = newCourses.filter(course => course.usuarios.length);

      notifySuccess('O coordenador foi excluído!');

      setCourses(newCourses);
      setIsAlertDeleteUserOpen(false);
    } catch (err) {
      notifyError('Não foi possível excluir o coordenador');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Heading as="h1" marginBottom="5">
        Início
      </Heading>

      <Flex justifyContent="space-between" alignItems="center" marginBottom={3}>
        <Heading as="h2" size="md">
          Coordenadores
        </Heading>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push('/administrator/coordinator/new')}
        >
          Cadastrar coordenador
        </Button>
      </Flex>

      <ul style={{ listStyle: 'none', margin: 0 }}>
        {courses.map(course => (
          <>
            <li>
              <Heading as="h3" size="sm">
                {course.name}
              </Heading>
            </li>
            <ul style={{ listStyle: 'none', margin: 0, marginBottom: 30 }}>
              {course.users.map(user => (
                <li>
                  <Flex
                    boxShadow="md"
                    marginBottom="3"
                    padding="3"
                    borderRadius="md"
                    transition="all 0.2s"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <span>{user.name}</span>
                    <Stack
                      alignItems="flex-start"
                      marginLeft="5"
                      spacing="2"
                      direction="row"
                    >
                      <Tooltip label="Editar" aria-label="Editar">
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label="Trash Icon"
                          icon={<FiEdit size={20} />}
                          onClick={() => {
                            history.push(
                              `/administrator/coordinator/update/${user.id}`,
                            );
                          }}
                        />
                      </Tooltip>
                      <Tooltip label="Excluir" aria-label="Excluir">
                        <IconButton
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          aria-label="Trash Icon"
                          icon={<FiTrash size={20} />}
                          onClick={() => handleUserToBeDeleted(user.id)}
                        />
                      </Tooltip>
                    </Stack>
                  </Flex>
                </li>
              ))}
            </ul>
          </>
        ))}
      </ul>

      <AlertDialog
        isOpen={isAlertDeleteUserOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setUserToBeDeleted(0)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Coordenador
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o coordenador? Essa ação não pode
              ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsAlertDeleteUserOpen(false)}
              >
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={deleteUser} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
