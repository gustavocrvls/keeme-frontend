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
import PERFIS from '../../../../constants/Perfis';
import api from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { ICourse } from './dtos';
import PageTitle from '../../../../components/PageTitle';
import { cpfMask } from '../../../../utils/masks';
import { isValidCPF } from '../../../../utils/validations';

export function RegisterCoordinator(): JSX.Element {
  const [courses, setCourses] = useState<Array<ICourse>>([]);

  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorUsername, setCoordinatorUsername] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [coordinatorCPF, setCoordinatorCPF] = useState('');
  const [coordinatorCourse, setCoordinatorCourse] = useState('');
  const [coordinatorPassword, setCoordinatorPassword] = useState('');
  const [coordinatorPassword2, setCoordinatorPassword2] = useState('');

  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  async function loadCursos(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get('cursos', {
        params: {
          sortField: 'nome',
        },
      });
      setCourses(response.data.data);
    } catch (err) {
      notifyError('Não foi possível carregar os cursos :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCursos();
  }, []);

  async function handleForm(e: FormEvent): Promise<void> {
    e.preventDefault();

    if (!isValidCPF(coordinatorCPF.replace(/\D/g, ''))) {
      notifyError('CPF inválido!');
      return;
    }

    if (coordinatorPassword.length < 8) {
      notifyError('A senha deve ter mais de 8 caracteres!');
      return;
    }

    if (coordinatorPassword !== coordinatorPassword2) {
      notifyError('As senhas não estão iguais!');
      return;
    }

    setIsCreating(true);

    try {
      await api.post('users', {
        nome: coordinatorName,
        cpf: coordinatorCPF,
        email: coordinatorEmail,
        username: coordinatorUsername,
        senha: coordinatorPassword,
        perfil: PERFIS.COORDENADOR,
        curso: Number(coordinatorCourse),
      });
      notifySuccess('Novo coordenador cadastrado!');
      history.push('/administrator/home');
    } catch (err) {
      notifyError('Não foi possível cadastrar o coordenador :(');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div>
      <PageTitle>Cadastrar Coordenador</PageTitle>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <FormControl id="nome" isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              placeholder="Nome"
              value={coordinatorName}
              onChange={e => setCoordinatorName(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box marginBottom="3">
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormControl id="cpf" isRequired>
              <FormLabel>CPF</FormLabel>
              <Input
                type="text"
                placeholder="CPF"
                value={cpfMask(coordinatorCPF)}
                onChange={e => setCoordinatorCPF(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="E-mail"
                value={coordinatorEmail}
                onChange={e => setCoordinatorEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="usuario" isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                placeholder="Usuário"
                value={coordinatorUsername}
                onChange={e => setCoordinatorUsername(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <FormControl id="curso" isRequired>
            <FormLabel>Curso</FormLabel>
            <Select
              placeholder="Curso"
              value={coordinatorCourse}
              onChange={e => setCoordinatorCourse(e.target.value)}
            >
              {courses.map(curso => (
                <option key={curso.id} value={curso.id}>
                  {curso.nome}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginBottom="3">
          <SimpleGrid columns={2} spacing={2}>
            <FormControl id="senha" isRequired>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={coordinatorPassword}
                onChange={e => setCoordinatorPassword(e.target.value)}
                placeholder="Nome"
              />
            </FormControl>

            <FormControl id="senha2" isRequired>
              <FormLabel>Confirmar Senha</FormLabel>
              <Input
                type="password"
                placeholder="Nome"
                value={coordinatorPassword2}
                onChange={e => setCoordinatorPassword2(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>
        <Flex justifyContent="center">
          <Button
            type="submit"
            isLoading={isCreating || isLoading}
            colorScheme="teal"
          >
            Cadastrar
          </Button>
        </Flex>
      </form>
    </div>
  );
}
