/* eslint-disable react/no-unescaped-entities */
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
  Heading,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { RouteComponentProps } from 'react-router-dom';
import ConstPerfis from '../../../constants/ConstPerfis';
import api from '../../../services/api';
import { notifyError, notifySuccess } from '../../../utils/Notifications';

interface IUsuario {
  id: number;
  nome: string;
}

interface ICursos {
  id: number;
  nome: string;
  usuarios: Array<IUsuario>;
}

interface IState {
  cursos: Array<ICursos>;
  isModalDeletedUserOpen: boolean;
  userToBeDeleted: number;
}

class Dashboard extends React.Component<RouteComponentProps, IState> {
  private cancelRef = React.createRef<HTMLButtonElement>();

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      cursos: [],

      // delete user
      isModalDeletedUserOpen: false,
      userToBeDeleted: 0,
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const response = await api.get(
        `usuarios/perfil/${ConstPerfis.COORDENADOR}/cursos`,
      );
      this.setState({
        cursos: response.data.cursos,
      });
    } catch (err) {
      notifyError('Não foi possível carregar os dados');
    }
  }

  handleUserToBeDeleted = (userId: number): void => {
    this.setState({
      isModalDeletedUserOpen: true,
      userToBeDeleted: userId,
    });
  };

  deleteUser = async (): Promise<void> => {
    const { userToBeDeleted, cursos } = this.state;

    try {
      await api.delete(`usuarios/${userToBeDeleted}`);

      const cursosState = cursos;

      let newCursos = cursosState.map(curso => {
        return {
          ...curso,
          usuarios: curso.usuarios.filter(
            usuario => usuario.id !== userToBeDeleted,
          ),
        };
      });

      newCursos = newCursos.filter(curso => curso.usuarios.length);

      notifySuccess('O coordenador foi excluído!');
      this.setState({
        isModalDeletedUserOpen: false,
        cursos: newCursos,
      });
    } catch (err) {
      notifyError('Não foi possível excluir o coordenador');
    }
  };

  goToCadastrarCoordenador = (): void => {
    const { history } = this.props;

    history.push('/administrador/cadastrar-coordenador');
  };

  render(): JSX.Element {
    const { cursos, isModalDeletedUserOpen } = this.state;
    return (
      <div>
        <Heading as="h1" marginBottom="5">
          Dashboard
        </Heading>

        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h2" size="md" marginBottom="5">
            Coordenadores do Sistema
          </Heading>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={this.goToCadastrarCoordenador}
          >
            Cadastrar Novo
          </Button>
        </Flex>

        <ul style={{ listStyle: 'none', margin: 0 }}>
          {cursos.map(curso => (
            <>
              <li>
                <Heading as="h3" size="sm">
                  {curso.nome}
                </Heading>
              </li>
              <ul style={{ listStyle: 'none', margin: 0, marginBottom: 30 }}>
                {curso.usuarios.map(usuario => (
                  <li>
                    <Flex
                      boxShadow="md"
                      marginBottom="2"
                      padding="2"
                      borderRadius="md"
                      // _hover={{ shadow: 'xl' }}
                      transition="all 0.2s"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <span>{usuario.nome}</span>
                      <Tooltip label="Excluir" aria-label="Excluir">
                        <IconButton
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          aria-label="Trash Icon"
                          icon={<FiTrash size={18} />}
                          onClick={() => this.handleUserToBeDeleted(usuario.id)}
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
          isOpen={isModalDeletedUserOpen}
          leastDestructiveRef={this.cancelRef}
          onClose={() => console.log('teste')}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Excluir Coordenador
              </AlertDialogHeader>

              <AlertDialogBody>
                Tem certeza que deseja apagar o coordenador? Essa ação não pode
                ser desfeita.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={this.cancelRef}
                  onClick={() => {
                    this.setState({
                      isModalDeletedUserOpen: false,
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={this.deleteUser} ml={3}>
                  Excluir
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    );
  }
}

export default Dashboard;
