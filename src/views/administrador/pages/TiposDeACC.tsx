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
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../../services/api';
import { notifyError, notifySuccess } from '../../../utils/Notifications';

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

interface IProps {}

interface IState {
  tiposDeACC: Array<ITipoDeAcc>;
  tipoDeACCToBeDeleted: number;
  isAlertDeletedTipoDeACCOpen: boolean;
}

class TiposDeACC extends React.Component<IProps, IState> {
  private cancelRef = React.createRef<HTMLButtonElement>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      tiposDeACC: [],
      tipoDeACCToBeDeleted: 0,
      isAlertDeletedTipoDeACCOpen: false,
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.get('/tipos-de-acc');

    this.setState({
      tiposDeACC: response.data,
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

    try {
      await api.delete(`tipos-de-acc/${tipoDeACCToBeDeleted}`);

      const newTiposDeAcc = tiposDeACC.filter(
        tipoDeAcc => tipoDeAcc.id !== tipoDeACCToBeDeleted,
      );
      this.setState({
        tiposDeACC: newTiposDeAcc,
      });
      notifySuccess('O tipo de ACC foi excluído!');
    } catch (err) {
      notifyError('Não foi possível excluir o Tipo de ACC');
    } finally {
      this.setState({
        isAlertDeletedTipoDeACCOpen: false,
      });
    }
  };

  render(): JSX.Element {
    const { tiposDeACC, isAlertDeletedTipoDeACCOpen } = this.state;

    return (
      <div>
        <Heading as="h1">Tipos de ACC</Heading>

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
                      <IconButton
                        aria-label="Edit Icon"
                        icon={<FiEdit size={16} />}
                        size="sm"
                        colorScheme="gray"
                        variant="ghost"
                      />
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

        <AlertDialog
          isOpen={isAlertDeletedTipoDeACCOpen}
          leastDestructiveRef={this.cancelRef}
          onClose={() => console.log('excluir')}
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
