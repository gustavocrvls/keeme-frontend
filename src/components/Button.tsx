// import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from "polished";

const Button = styled.button`
  border: 0;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;

  background-color: ${(props: Color) => props.color};

  color: #fff;
  font-size: 14px;
  text-decoration: none;

  // display: flex;
  // align-items: center;
  // justify-content: center;

  cursor: pointer;

  &:hover {
    background-color: ${(props: Color) => darken(0.1, '#31878C')};
  }
`;

const LinkButton = styled(Link)`
  border: 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  
  background-color: ${(props: Color) => props.color};
  
  color: #fff;
  font-size: 14px;
  text-decoration: none;

  // display: flex;
  // align-items: center;
  // justify-content: center;

  cursor: pointer;

  &:hover {
    background-color: ${(props: Color) => darken(0.1, '#31878C')};
  }
`

interface Color {
  color: string
}

export {
  Button,
  LinkButton
}