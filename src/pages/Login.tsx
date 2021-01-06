import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { useHistory } from "react-router-dom";

import loginVector1 from '../assets/images/login__vector_1.svg';
import loginVector2 from '../assets/images/login__vector_2.svg';
import { Input } from '../components/Inputs';
import { Button } from '../components/Button';

const vStyles1: CSSProperties = {
  position: 'absolute',
  left: '120px',
}

const vStyles2: CSSProperties = {
  position: 'absolute',
  left: '0',
}

const LoginCard = styled.div`
  position: absolute;
  width: 579px;
  height: 427px;
  left: 816px;
  top: 196px;

  padding: 20px;

  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 5px;
`;

const LoginCardTitle = styled.h1`
  text-align: center;
  color: #4D6F80;
`;

const LoginForm = styled.form`

  input {
    width: 100%;
  }
  
  label {
    color: #4D6F80;
  }

  div {
    margin-bottom: 10px;
  }
`;

export default function Login () {
  let history = useHistory();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push("/home");
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <img style={vStyles1} src={loginVector1} alt="v1" height='100%' />
      <img style={vStyles2} src={loginVector2} alt="v2" height='100%' />
      <LoginCard>
        <LoginCardTitle>Gestor de ACCs</LoginCardTitle>
        <LoginForm onSubmit={login}>
          <div>
            <label>usuário</label>
            <Input id="login" type="text" placeholder="usuário" />
          </div>
          <div>
            <label>senha</label>
            <Input id="password" type="text" placeholder="******" />
          </div>
          <div>
            <Button color="#31878C" type="submit" style={{ width: '100%' }}>Entrar</Button>
          </div>
        </LoginForm>
      </LoginCard>
    </div>
  );
}