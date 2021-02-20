import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ConstPerfis from '../../../constants/ConstPerfis';
import api from '../../../services/api';
import { notifyError, notifySuccess } from '../../../utils/Notifications';

interface ICurso {
  id: number;
  nome: string;
}

interface IState {
  cursos: Array<ICurso>;
  nome: string;
  username: string;
  idCurso: string;
  senha: string;
  senha2: string;
  isCreating: boolean;
}

class CadastrarCoordenador extends React.Component<
  RouteComponentProps,
  IState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      cursos: [],

      nome: '',
      username: '',
      idCurso: '',
      senha: '',
      senha2: '',

      isCreating: false,
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.get('cursos');
    this.setState({
      cursos: response.data.cursos,
    });
  }

  handleForm = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const { nome, username, idCurso, senha } = this.state;
    const { history } = this.props;

    this.setState({
      isCreating: true,
    });

    try {
      await api.post('usuarios', {
        nome,
        username,
        senha,
        perfil: ConstPerfis.COORDENADOR,
        curso: Number(idCurso),
      });
      notifySuccess('Novo coordenador cadastrado!');
      history.push('/administrador/home');
    } catch (err) {
      notifyError('Não foi possível cadastrar o coordenador...');
    } finally {
      this.setState({
        isCreating: false,
      });
    }
  };

  render(): JSX.Element {
    const {
      cursos,
      nome,
      username,
      idCurso,
      senha,
      senha2,
      isCreating,
    } = this.state;

    return (
      <div>
        <Heading as="h1" marginBottom="5">
          Cadastrar Coordenador
        </Heading>

        <form onSubmit={this.handleForm}>
          <Box marginBottom="3">
            <SimpleGrid columns={2} spacing={2}>
              <FormControl id="nome">
                <FormLabel>Nome</FormLabel>
                <Input
                  type="nome"
                  placeholder="Nome"
                  value={nome}
                  onChange={e => this.setState({ nome: e.target.value })}
                />
              </FormControl>

              <FormControl id="usuario">
                <FormLabel>Usuário</FormLabel>
                <Input
                  type="usuario"
                  placeholder="Usuário"
                  value={username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </FormControl>
            </SimpleGrid>
          </Box>
          <Box marginBottom="3">
            <FormControl id="curso">
              <FormLabel>Curso</FormLabel>
              <Select
                placeholder="Curso"
                value={idCurso}
                onChange={e => {
                  this.setState({ idCurso: e.target.value });
                }}
              >
                {cursos.map(curso => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box marginBottom="3">
            <SimpleGrid columns={2} spacing={2}>
              <FormControl id="senha">
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={senha}
                  onChange={e => this.setState({ senha: e.target.value })}
                  placeholder="Nome"
                />
              </FormControl>

              <FormControl id="senha2">
                <FormLabel>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Nome"
                  value={senha2}
                  onChange={e => this.setState({ senha2: e.target.value })}
                />
              </FormControl>
            </SimpleGrid>
          </Box>
          <Flex justifyContent="center">
            <Button type="submit" isLoading={isCreating} colorScheme="teal">
              Cadastrar
            </Button>
          </Flex>
        </form>
      </div>
    );
  }
}

export default CadastrarCoordenador;
