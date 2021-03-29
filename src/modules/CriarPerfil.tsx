/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import loginVector1 from '../assets/images/login__vector_1.svg';
import api from '../services/api';
import { login } from '../services/auth';
import PERFIS from '../constants/Perfis';
import { notifyError, notifySuccess } from '../components/Notifications';
import { isValidCPF } from '../utils/validations';
import { cpfMask } from '../utils/masks';

const CriarPerfilCard = styled.div`
  padding: 20px;
  margin: 10px;

  box-sizing: border-box;
  background: #ffffff;
  border-radius: 5px;
  z-index: 10;

  min-height: 400px;
  width: 100%;
  max-width: 900px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CriarPerfilCardTitle = styled.h1`
  text-align: center;
  color: #4d6f80;
  font-size: 36px;
`;

const LoginForm = styled.form`
  width: 100%;

  input {
    width: 100%;
  }

  label {
    color: #4d6f80;
  }

  div {
    margin-bottom: 10px;
  }
`;

type Curso = {
  id: number;
  nome: string;
};

export default function CriarPerfil(): JSX.Element {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const [idCurso, setIdCurso] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [cursos, setCursos] = useState<Curso[]>([]);

  const history = useHistory();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidCPF(cpf.replace(/\D/g, ''))) {
      notifyError('CPF inválido!');
      return;
    }

    if (senha.length < 8) {
      notifyError('A senha deve ter mais de 8 caracteres!');
      return;
    }

    if (senha !== senha2) {
      notifyError('As senhas não estão iguais!');
      return;
    }

    const result = await api.post('users/create-discente', {
      nome,
      username,
      cpf,
      email,
      senha,
      curso: idCurso,
    });

    if (result.status === 201) {
      const resultLogin = await api.post('users/login', {
        username,
        senha,
      });

      if (resultLogin.data.auth) {
        login(
          resultLogin.data.token,
          resultLogin.data.usuario.id,
          resultLogin.data.usuario.perfil.id,
          resultLogin.data.usuario.nome,
        );

        notifySuccess('Usuário criado com sucesso!');

        if (resultLogin.data.usuario.perfil.id === PERFIS.DISCENTE) {
          history.push('/discente/home');
        }
      }
    }
  };

  async function loadCursos() {
    const response = await api.get('cursos');

    setCursos(response.data.data);
  }

  useEffect(() => {
    try {
      setIsLoading(true);
      loadCursos();
    } catch (err) {
      notifyError('Não foi possível carregar os cursos :(');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url("${loginVector1}")`,
        backgroundColor: '#f0f0f0',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CriarPerfilCard>
        <CriarPerfilCardTitle>KeeMe</CriarPerfilCardTitle>
        <LoginForm onSubmit={handleSignUp}>
          <FormControl id="nome" isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </FormControl>

          <SimpleGrid columns={[1, 2]} gap="3">
            <FormControl id="cpf" isRequired>
              <FormLabel>CPF</FormLabel>
              <Input
                type="text"
                placeholder="CPF"
                value={cpfMask(cpf)}
                onChange={e => {
                  setCPF(e.target.value);
                }}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={[1, 2]} gap="3">
            <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="usuario" isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl id="curso" isRequired>
            <FormLabel>Curso</FormLabel>
            <Select
              placeholder="Curso"
              value={idCurso}
              onChange={e => setIdCurso(e.target.value)}
            >
              {cursos.map(curso => (
                <option key={curso.id} value={curso.id}>
                  {curso.nome}
                </option>
              ))}
            </Select>
          </FormControl>

          <SimpleGrid columns={[1, 2]} gap="3">
            <FormControl id="senha" isRequired>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={senha}
                minLength={8}
                onChange={e => setSenha(e.target.value)}
              />
            </FormControl>

            <FormControl id="senha2" isRequired>
              <FormLabel>Confirmar Senha</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={senha2}
                onChange={e => setSenha2(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>

          <Flex width="100%" marginTop="7" justifyContent="center">
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isLoading}
              loadingText="Criar Perfil"
            >
              Criar Perfil
            </Button>
          </Flex>
        </LoginForm>
        <Flex width="100%" marginTop="10">
          <Button onClick={() => history.push('/login')} variant="link">
            Voltar para tela de login
          </Button>
        </Flex>
      </CriarPerfilCard>
    </div>
  );
}
