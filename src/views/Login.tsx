/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import loginVector1 from '../assets/images/login__vector_1.svg';
import loginVector2 from '../assets/images/login__vector_2.svg';
import { Input } from '../components/Inputs';
import api from '../services/api';
import { login } from '../services/auth';
import ConstPerfis from '../constants/ConstPerfis';

const LoginCard = styled.div`
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

const LoginCardTitle = styled.h1`
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

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await api.post('usuarios/login', {
      username,
      senha,
    });

    if (result.data.auth) {
      login(
        result.data.token,
        result.data.usuario.id,
        result.data.usuario.perfil.id,
      );

      if (result.data.usuario.perfil.id === ConstPerfis.DISCENTE) {
        history.push('/discente/home');
      }
      if (result.data.usuario.perfil.id === ConstPerfis.COORDENADOR) {
        history.push('/coordenador/home');
      }
      if (result.data.usuario.perfil.id === ConstPerfis.ADMIN) {
        history.push('/administrador/home');
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
      <LoginCard>
        <LoginCardTitle>Gestor de ACCs</LoginCardTitle>
        <LoginForm onSubmit={handleSignIn}>
          <FormControl id="username">
            <FormLabel>Usuário</FormLabel>
            <Input
              type="text"
              placeholder="Nome"
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
          <Button type="submit" width="100%" colorScheme="teal">
            Entrar
          </Button>
        </LoginForm>
      </LoginCard>
    </div>
  );
}
