// import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';
import { Color } from './interfaces/Color';

export const color = {
  primary: '#31878C',
  secondary: '#FAFAFA',
  danger: '#FAFAFA',
};

const Button = styled.button`
  border: 0;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;

  background-color: ${(props: Color) => color[props.color]};

  color: #fff;
  font-size: 1.2rem;
  text-decoration: none;

  cursor: pointer;

  &:hover {
    background-color: ${(props: Color) => darken(0.1, color[props.color])};
  }
`;

const LinkButton = styled(Link)`
  border: 0;
  padding: 10px;
  border-radius: 5px;
  border: none;

  background-color: ${(props: Color) => color[props.color]};

  color: #fff;
  font-size: 14px;
  text-decoration: none;

  cursor: pointer;

  &:hover {
    background-color: ${(props: Color) => darken(0.1, color[props.color])};
  }
`;

const AnchorButton = styled.a`
  border: 0;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;

  background-color: ${(props: Color) => color[props.color]};

  color: #fff;
  font-size: 14px;
  text-decoration: none;

  cursor: pointer;

  &:hover {
    background-color: ${(props: Color) => darken(0.1, color[props.color])};
  }
`;

export { Button, LinkButton, AnchorButton };
