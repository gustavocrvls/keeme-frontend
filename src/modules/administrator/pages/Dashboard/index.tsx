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
  Tooltip,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { RouteComponentProps, useHistory } from 'react-router-dom';
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
          usuarios: course.usuarios.filter(
            usuario => usuario.id !== userToBeDeleted,
          ),
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
          Coordenadores do Sistema
        </Heading>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push('/administrator/register-coordinator')}
        >
          Cadastrar coordenador
        </Button>
      </Flex>

      <ul style={{ listStyle: 'none', margin: 0 }}>
        {courses.map(course => (
          <>
            <li>
              <Heading as="h3" size="sm">
                {course.nome}
              </Heading>
            </li>
            <ul style={{ listStyle: 'none', margin: 0, marginBottom: 30 }}>
              {course.usuarios.map(user => (
                <li>
                  <Flex
                    boxShadow="md"
                    marginBottom="3"
                    padding="2"
                    borderRadius="md"
                    // _hover={{ shadow: 'xl' }}
                    transition="all 0.2s"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <span>{user.nome}</span>
                    <Tooltip label="Excluir" aria-label="Excluir">
                      <IconButton
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        aria-label="Trash Icon"
                        icon={<FiTrash size={18} />}
                        onClick={() => handleUserToBeDeleted(user.id)}
                      />
                    </Tooltip>
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
