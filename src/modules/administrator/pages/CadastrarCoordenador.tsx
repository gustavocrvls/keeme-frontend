import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PERFIS from '../../../constants/Perfis';
import api from '../../../services/api';
import { notifyError, notifySuccess } from '../../../components/Notifications';

interface ICurso {
  id: number;
  nome: string;
}

export default function CadastrarCoordenador(): JSX.Element {
  const [cursos, setCursos] = useState<Array<ICurso>>([]);

  const [formNome, setFormNome] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formIdCurso, setFormIdCurso] = useState('');
  const [formSenha, setFormSenha] = useState('');
  const [formSenha2, setFormSenha2] = useState('');

  const [isCreating, setIsCreating] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function loadCursos(): Promise<void> {
      const response = await api.get('cursos');
      setCursos(response.data.cursos);
    }

    loadCursos();
  }, []);

  async function handleForm(e: FormEvent): Promise<void> {
    e.preventDefault();

    setIsCreating(true);

    try {
      await api.post('users', {
        nome: formNome,
        username: formUsername,
        senha: formSenha,
        perfil: PERFIS.COORDENADOR,
        curso: Number(formIdCurso),
      });
      notifySuccess('Novo coordenador cadastrado!');
      history.push('/administrator/home');
    } catch (err) {
      notifyError('Não foi possível cadastrar o coordenador...');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div>
      <Heading as="h1" marginBottom="5">
        Cadastrar Coordenador
      </Heading>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <SimpleGrid columns={2} spacing={2}>
            <FormControl id="nome">
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Nome"
                value={formNome}
                onChange={e => setFormNome(e.target.value)}
              />
            </FormControl>

            <FormControl id="usuario">
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                placeholder="Usuário"
                value={formUsername}
                onChange={e => setFormUsername(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <FormControl id="curso">
            <FormLabel>Curso</FormLabel>
            <Select
              placeholder="Curso"
              value={formIdCurso}
              onChange={e => setFormIdCurso(e.target.value)}
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
                value={formSenha}
                onChange={e => setFormSenha(e.target.value)}
                placeholder="Nome"
              />
            </FormControl>

            <FormControl id="senha2">
              <FormLabel>Confirmar Senha</FormLabel>
              <Input
                type="password"
                placeholder="Nome"
                value={formSenha2}
                onChange={e => setFormSenha2(e.target.value)}
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
