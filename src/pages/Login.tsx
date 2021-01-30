/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { useHistory } from 'react-router-dom';

import loginVector1 from '../assets/images/login__vector_1.svg';
import loginVector2 from '../assets/images/login__vector_2.svg';
import { Input } from '../components/Inputs';
import { Button } from '../components/Button';
import api from '../services/api';
import { login } from '../services/auth';

const vStyles1: CSSProperties = {
  position: 'absolute',
  left: '120px',
};

const vStyles2: CSSProperties = {
  position: 'absolute',
  left: '0',
};

const LoginCard = styled.div`
  position: absolute;
  width: 579px;
  height: 427px;
  left: 816px;
  top: 196px;

  padding: 20px;

  box-sizing: border-box;
  background: #ffffff;
  border-radius: 5px;
`;

const LoginCardTitle = styled.h1`
  text-align: center;
  color: #4d6f80;
`;

const LoginForm = styled.form`
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

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSenha = (e: ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const history = useHistory();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await api.post('usuarios/login', {
      username,
      senha,
    });

    if (result.data.auth) {
      login(result.data.token, result.data.usuario.id);
      history.push('/home');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <img style={vStyles1} src={loginVector1} alt="v1" height="100%" />
      <img style={vStyles2} src={loginVector2} alt="v2" height="100%" />
      <LoginCard>
        <LoginCardTitle>Gestor de ACCs</LoginCardTitle>
        <LoginForm onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username">
              usuário
              <Input
                id="username"
                type="text"
                placeholder="usuário"
                value={username}
                onChange={handleUsername}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              senha
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={senha}
                onChange={handleSenha}
              />
            </label>
          </div>
          <div>
            <Button color="primary" type="submit" style={{ width: '100%' }}>
              Entrar
            </Button>
          </div>
        </LoginForm>
      </LoginCard>
    </div>
  );
}
