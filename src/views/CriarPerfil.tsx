/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import loginVector1 from '../assets/images/login__vector_1.svg';
import api from '../services/api';
import { login } from '../services/auth';
import ConstPerfis from '../constants/ConstPerfis';
import { notifyError } from '../components/Notifications';

const CriarPerfilCard = styled.div`
  padding: 20px;
  margin: 10px;

  box-sizing: border-box;
  background: #ffffff;
  border-radius: 5px;
  z-index: 10;

  min-height: 400px;
  width: 100%;
  max-width: 500px;

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

export default function CriarPerfil(): JSX.Element {
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');

  const history = useHistory();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (senha !== senha2) {
      notifyError('As senhas não estão iguais!');
      return;
    }

    const result = await api.post('usuarios', {
      nome,
      username,
      senha,
      perfil: ConstPerfis.DISCENTE,
      curso: 1, // TODO
    });

    if (result.status === 201) {
      const resultLogin = await api.post('usuarios/login', {
        username,
        senha,
      });

      if (resultLogin.data.auth) {
        login(
          resultLogin.data.token,
          resultLogin.data.usuario.id,
          resultLogin.data.usuario.perfil.id,
        );

        if (resultLogin.data.usuario.perfil.id === ConstPerfis.DISCENTE) {
          history.push('/discente/home');
        }
      }
    }
  };

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
          <FormControl id="username">
            <FormLabel>Nome</FormLabel>
            <Input
              isRequired
              aria-required
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </FormControl>

          <FormControl id="username">
            <FormLabel>Usuário</FormLabel>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="********"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Confirmar Senha</FormLabel>
            <Input
              type="password"
              placeholder="********"
              value={senha2}
              onChange={e => setSenha2(e.target.value)}
            />
          </FormControl>

          <Button type="submit" width="100%" colorScheme="teal">
            Criar Perfil
          </Button>
        </LoginForm>
      </CriarPerfilCard>
    </div>
  );
}
