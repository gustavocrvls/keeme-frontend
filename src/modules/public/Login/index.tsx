/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  Link,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Img,
  Grid,
} from '@chakra-ui/react';
import { publicApi } from '../../../services/api';
import { login } from '../../../services/auth';
import { PROFILES } from '../../../constants/Profiles';
import { notifyError } from '../../../components/Notifications';
import { LoginResponse } from './dtos';

import reviewedDocsImg from '../../../assets/images/reviewed_docs.svg';
import { Footer } from '../../../components/Footer';

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
      const response = await publicApi.post<LoginResponse>('users/login', {
        username,
        password,
      });

      if (response.data.auth) {
        const { data: user } = response.data;

        login(
          response.headers['access-token'],
          String(user.id),
          String(user.profile.id),
          user.name,
          user.course ? String(user.course.id) : '0',
        );

        switch (user.profile.id) {
          case PROFILES.STUDENT:
            history.push('/student/home');
            break;
          case PROFILES.COORDINATOR:
            history.push('/coordinator/home');
            break;
          case PROFILES.ADMINISTRATOR:
            history.push('/administrator/home');
            break;
          default:
            history.push('/');
            break;
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
    <Grid
      templateColumns="1fr 1fr"
      height="100vh"
      maxW={980}
      margin="0 auto"
      gap="20"
    >
      <Flex
        background="teal"
        backgroundColor="white"
        height="100vh"
        align="center"
        justifyContent="center"
        display={['none', 'none', 'none', 'flex']}
        direction="column"
      >
        <Img src={reviewedDocsImg} width="100%" />
        <Text textAlign="center" fontSize="3xl" color="teal">
          Bem-vindo ao KeeMe!
        </Text>
        <Text textAlign="center" color="gray.700">
          Uma aplicação de gestão de Atividades Curriculares Complementares
        </Text>
      </Flex>
      <Flex justifyContent="center" direction="column">
        <Text as="h1" fontSize="5xl" color="teal" textAlign="center">
          KeeMe
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          (Utilize o seu usuário do Sigaa)
        </Text>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <FormControl id="username">
            <FormLabel color="gray.500">Usuário</FormLabel>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
              focusBorderColor="pink.500"
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
      </Flex>
    </Grid>
  );
}

/**
 * <Flex
        justifyContent="center"
        position={['absolute']}
        color={['white', 'black']}
        bottom={[10, 0]}
        right={['unset']}
        margin="3"
        fontSize="sm"
      >
        <Link href="/about">
          sobre o projeto
        </Link>
      </Flex>
      <Flex
        justifyContent="center"
        position={['absolute']}
        color={['white', 'black']}
        bottom="0"
        right={['unset', 0]}
        margin="3"
        fontSize="sm"
      >
        developed with <del style={{ margin: '0 4px' }}>coffee</del> <Text as="span" color="red" marginRight="4px">❤ </Text> by
        <Link
          style={{ margin: '0 4px' }}
          href="https://github.com/gustavocrvls"
          isExternal
        >
          @gustavocrvls
        </Link>
      </Flex>
 */
