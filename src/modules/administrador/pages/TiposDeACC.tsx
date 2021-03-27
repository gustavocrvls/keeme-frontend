/* eslint-disable camelcase */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  createStandaloneToast,
  Flex,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Skeleton,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { RouteComponentProps } from 'react-router-dom';
import api from '../../../services/api';
import { notifyError, notifySuccess } from '../../../components/Notifications';

interface ITipoDeAcc {
  id: number;
  nome: string;
  limite_de_pontos: number;
  completed: number;
  pontuacao: number;
  unidade_de_medida: {
    nome: string;
  };
  pontos_por_unidade: number;
}

interface IState {
  tiposDeACC: Array<ITipoDeAcc>;
  tipoDeACCToBeDeleted: number;
  isAlertDeletedTipoDeACCOpen: boolean;
  isLoadingData: boolean;
}

class TiposDeACC extends React.Component<RouteComponentProps, IState> {
  private cancelRef = React.createRef<HTMLButtonElement>();

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      tiposDeACC: [],
      tipoDeACCToBeDeleted: 0,
      isAlertDeletedTipoDeACCOpen: false,
      isLoadingData: false,
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({
      isLoadingData: true,
    });

    const response = await api.get('/tipos-de-acc');

    this.setState({
      tiposDeACC: response.data,
      isLoadingData: false,
    });
  }

  handleTipoDeACCToBeDeleted = (idTipoDeACC: number): void => {
    this.setState({
      isAlertDeletedTipoDeACCOpen: true,
      tipoDeACCToBeDeleted: idTipoDeACC,
    });
  };

  deleteTipoDeACC = async (): Promise<void> => {
    const { tipoDeACCToBeDeleted, tiposDeACC } = this.state;
    const toast = createStandaloneToast();

    try {
      await api.delete(`tipos-de-acc/${tipoDeACCToBeDeleted}`);

      const newTiposDeAcc = tiposDeACC.filter(
        tipoDeAcc => tipoDeAcc.id !== tipoDeACCToBeDeleted,
      );
      this.setState({
        tiposDeACC: newTiposDeAcc,
      });
      toast({
        title: 'Sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
        render: props => (
          <Box m={3} color="white" p={3} bg="teal.500" borderRadius="md">
            <p>
              <strong>Sucesso!</strong>
            </p>
            <p>O tipo de ACC foi excluído!</p>
          </Box>
        ),
      });
    } catch (err) {
      toast({
        title: 'Ops!',
        description: 'Não foi possível excluir o Tipo de ACC!',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      this.setState({
        isAlertDeletedTipoDeACCOpen: false,
      });
    }
  };

  goToCadastrarTipoDeACC = (): void => {
    const { history } = this.props;

    history.push('/administrador/cadastrar-tipo-de-acc');
  };

  goToEditarTipoDeACC = (idTipoDeACC: number): void => {
    const { history } = this.props;

    history.push(`/administrador/editar-tipo-de-acc/${idTipoDeACC}`);
  };

  render(): JSX.Element {
    const {
      tiposDeACC,
      isAlertDeletedTipoDeACCOpen,
      isLoadingData,
    } = this.state;

    return (
      <div>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom="5"
        >
          <Heading as="h1">Tipos de ACC</Heading>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={this.goToCadastrarTipoDeACC}
          >
            Cadastrar nova
          </Button>
        </Flex>

        {isLoadingData ? (
          <Stack>
            <Skeleton height="80px" />
            <Skeleton height="80px" />
            <Skeleton height="80px" />
            <Skeleton height="80px" />
            <Skeleton height="80px" />
          </Stack>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0 }}>
            {tiposDeACC.map(tipoDeAcc => (
              <li>
                <Box
                  boxShadow="md"
                  marginBottom="2"
                  padding="2"
                  borderRadius="md"
                >
                  <SimpleGrid columns={12}>
                    <GridItem colSpan={11}>
                      <strong>{tipoDeAcc.nome}</strong>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Stack
                        spacing="1"
                        direction={['column', 'row']}
                        justifyContent="flex-end"
                      >
                        <Tooltip label="Editar" aria-label="Editar">
                          <IconButton
                            aria-label="Edit Icon"
                            icon={<FiEdit size={16} />}
                            size="sm"
                            colorScheme="gray"
                            variant="ghost"
                            onClick={() => {
                              this.goToEditarTipoDeACC(tipoDeAcc.id);
                            }}
                          />
                        </Tooltip>
                        <Tooltip label="Excluir" aria-label="Excluir">
                          <IconButton
                            aria-label="Trash Icon"
                            icon={<FiTrash size={16} />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => {
                              this.handleTipoDeACCToBeDeleted(tipoDeAcc.id);
                            }}
                          />
                        </Tooltip>
                      </Stack>
                    </GridItem>
                  </SimpleGrid>
                  <SimpleGrid columns={6}>
                    <GridItem colSpan={2} marginRight="4">
                      {`Pontos por ${tipoDeAcc.unidade_de_medida.nome}: ${tipoDeAcc.pontos_por_unidade}`}
                    </GridItem>
                    <GridItem>{`Limite: ${tipoDeAcc.limite_de_pontos}`}</GridItem>
                  </SimpleGrid>
                </Box>
              </li>
            ))}
          </ul>
        )}
        <AlertDialog
          isOpen={isAlertDeletedTipoDeACCOpen}
          leastDestructiveRef={this.cancelRef}
          onClose={() => {
            this.setState({
              tipoDeACCToBeDeleted: 0,
            });
          }}
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
                  ref={this.cancelRef}
                  onClick={() => {
                    this.setState({
                      isAlertDeletedTipoDeACCOpen: false,
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={this.deleteTipoDeACC} ml={3}>
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

export default TiposDeACC;
