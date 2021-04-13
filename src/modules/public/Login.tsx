/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
} from '@chakra-ui/react';
import loginVector1 from '../../assets/images/login__vector_1.svg';
import loginVector2 from '../../assets/images/login__vector_2.svg';
import api from '../../services/api';
import { login } from '../../services/auth';
import PERFIS from '../../constants/Perfis';
import { notifyError } from '../../components/Notifications';
import { Footer } from '../../components/Footer';

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

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await api.post('users/login', {
        username,
        password,
      });

      if (result.data.auth) {
        login(
          result.data.token,
          result.data.user.id,
          result.data.user.profile.id,
          result.data.user.name,
          result.data.user.course ? result.data.user.course.id : 0,
        );

        if (result.data.user.profile.id === PERFIS.DISCENTE) {
          history.push('/discente/home');
        }
        if (result.data.user.profile.id === PERFIS.COORDENADOR) {
          history.push('/coordenador/home');
        }
        if (result.data.user.profile.id === PERFIS.ADMIN) {
          history.push('/administrator/home');
        }
      } else {
        notifyError('Usuário e/ou senha incorretos!');
        setIsLoading(false);
      }
    } catch (err) {
      notifyError('Não foi possível fazer login :(');
    } finally {
      setIsLoading(false);
    }
  }

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
        <LoginCardTitle>KeeMe</LoginCardTitle>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <FormControl id="username">
            <FormLabel color="gray.500">Usuário</FormLabel>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" marginTop="1">
            <FormLabel color="gray.500">Senha</FormLabel>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setSenha(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            width="100%"
            colorScheme="teal"
            isLoading={isLoading}
            marginTop="5"
          >
            Entrar
          </Button>
        </form>
        <Flex justifyContent="flex-end" width="100%" marginTop="10">
          <Button onClick={() => history.push('/criar-perfil')} variant="link">
            Não possui perfil ainda?
          </Button>
        </Flex>
      </LoginCard>
      <Footer />
    </div>
  );
}