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
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PROFILES } from '../../../../constants/Profiles';
import { api } from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { ICourse } from './dtos';
import { CoursesList } from './components/CoursesList';

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
        `users/perfil/${PROFILES.COORDINATOR}/cursos`,
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

      <CoursesList
        courses={courses}
        deleteCoordinator={handleUserToBeDeleted}
        editCoordinator={id => {
          history.push(`/administrator/coordinator/update/${id}`);
        }}
      />

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
