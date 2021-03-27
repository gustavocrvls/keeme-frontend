import React, { FormEvent } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import { RouteComponentProps } from 'react-router-dom';
import api from '../../../services/api';
import { notifyError, notifySuccess } from '../../../components/Notifications';

interface IUnidadeDeMedida {
  id: number;
  nome: string;
}

interface IState {
  unidadesDeMedida: Array<IUnidadeDeMedida>;
  isCreating: boolean;

  nome: string;
  idUnidadeDeMedida: number;
  pontosPorUnidade: string;
  limiteDePontos: string;
  descricao: string;
}

class CadastrarTipoDeACC extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      unidadesDeMedida: [],
      isCreating: false,

      nome: '',
      idUnidadeDeMedida: 0,
      pontosPorUnidade: '',
      limiteDePontos: '',
      descricao: '',
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.get('unidades-de-medida');

    this.setState({
      unidadesDeMedida: response.data.unidadesDeMedida,
    });
  }

  handleForm = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const {
      nome,
      idUnidadeDeMedida,
      pontosPorUnidade,
      limiteDePontos,
      descricao,
    } = this.state;

    const { history } = this.props;

    this.setState({
      isCreating: true,
    });

    try {
      await api.post('tipos-de-acc', {
        nome,
        pontosPorUnidade,
        limiteDePontos,
        sobre: descricao,
        unidadeDeMedida: idUnidadeDeMedida,
      });
      notifySuccess('Novo Tipo de ACC cadastrado!');
      history.push('/administrador/tipos-de-acc');
    } catch (err) {
      notifyError('Não foi possível cadastrar o Tipo de ACC...');
    } finally {
      this.setState({
        isCreating: false,
      });
    }
  };

  render(): JSX.Element {
    const {
      unidadesDeMedida,
      isCreating,
      nome,
      idUnidadeDeMedida,
      pontosPorUnidade,
      limiteDePontos,
      descricao,
    } = this.state;

    return (
      <div>
        <Heading as="h1">Cadastrar Tipo de ACC</Heading>

        <form onSubmit={this.handleForm}>
          <Box marginBottom="3">
            <FormControl id="nome">
              <FormLabel>Nome da Atividade</FormLabel>
              <Input
                type="nome"
                placeholder="Nome da Atividade"
                value={nome}
                onChange={e => this.setState({ nome: e.target.value })}
              />
            </FormControl>
          </Box>

          <Box marginBottom="3">
            <SimpleGrid columns={12} spacing={2}>
              <GridItem colSpan={6}>
                <FormControl id="unidadeDeMedida">
                  <FormLabel>Unidade De Medida</FormLabel>
                  <Select
                    placeholder="Unidade De Medida"
                    value={idUnidadeDeMedida}
                    onChange={e => {
                      this.setState({
                        idUnidadeDeMedida: Number(e.target.value),
                      });
                    }}
                  >
                    {unidadesDeMedida.map(unidade => (
                      <option key={unidade.id} value={unidade.id}>
                        {unidade.nome}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl id="pontosPorUnidade">
                  <FormLabel>
                    {`Pontos por ${
                      unidadesDeMedida.find(u => u.id === idUnidadeDeMedida)
                        ?.nome || 'Hora'
                    }`}
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder={`Pontos por ${
                      unidadesDeMedida.find(u => u.id === idUnidadeDeMedida)
                        ?.nome || 'Hora'
                    }`}
                    value={pontosPorUnidade}
                    onChange={e => {
                      this.setState({
                        pontosPorUnidade: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl id="limite">
                  <FormLabel>Limite da Pontuação</FormLabel>
                  <Input
                    type="number"
                    placeholder="Limite da Pontuação"
                    value={limiteDePontos}
                    onChange={e => {
                      this.setState({
                        limiteDePontos: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </Box>
          <Box marginBottom="3">
            <FormControl id="descricao">
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={descricao}
                onChange={e => {
                  this.setState({
                    descricao: e.target.value,
                  });
                }}
                placeholder="Limite da Pontuação"
                rows={6}
              />
            </FormControl>
          </Box>
          <Flex justifyContent="center">
            <Button
              type="submit"
              isLoading={isCreating}
              loadingText="Cadastrando"
              colorScheme="teal"
            >
              Cadastrar
            </Button>
          </Flex>
        </form>
      </div>
    );
  }
}

export default CadastrarTipoDeACC;
