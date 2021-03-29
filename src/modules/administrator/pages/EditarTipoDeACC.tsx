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

interface IMatchParams {
  id: string;
}

type IMatchProps = RouteComponentProps<IMatchParams>;

class EditarTipoDeACC extends React.Component<IMatchProps, IState> {
  constructor(props: IMatchProps) {
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
    try {
      const responseUnidades = await api.get('unidades-de-medida');

      this.setState({
        unidadesDeMedida: responseUnidades.data.unidadesDeMedida,
      });

      const { match } = this.props;
      const { params } = match;
      const { id } = params;

      const responseTiposDeACC = await api.get(`tipos-de-acc/${id}`);

      this.setState({
        nome: responseTiposDeACC.data.tipoDeACC.nome,
        idUnidadeDeMedida: responseTiposDeACC.data.tipoDeACC.unidade_de_medida,
        pontosPorUnidade: responseTiposDeACC.data.tipoDeACC.pontos_por_unidade,
        descricao: responseTiposDeACC.data.tipoDeACC.sobre,
        limiteDePontos: responseTiposDeACC.data.tipoDeACC.limite_de_pontos,
      });
    } catch (err) {
      notifyError('Não foi possível carregar os dados...');
    }
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

    const { history, match } = this.props;

    const { params } = match;
    const { id } = params;

    this.setState({
      isCreating: true,
    });

    try {
      await api.put(`tipos-de-acc/${id}`, {
        nome,
        pontos_por_unidade: pontosPorUnidade,
        limite_de_pontos: limiteDePontos,
        sobre: descricao,
        unidade_de_medida: idUnidadeDeMedida,
      });
      notifySuccess('O Tipo de ACC foi atualizado!');
      history.push('/administrator/tipos-de-acc');
    } catch (err) {
      notifyError('Não foi possível atualizar o Tipo de ACC...');
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
        <Heading as="h1">Editar Tipo de ACC</Heading>

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
              loadingText="Editando"
              colorScheme="teal"
            >
              Editar
            </Button>
          </Flex>
        </form>
      </div>
    );
  }
}

export default EditarTipoDeACC;
