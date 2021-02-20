// import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';
import { Color } from './interfaces/Color';

export const color = {
  primary: '#31878C',
  secondary: '#757474',
  danger: '#ce3535',
};

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;

  background-color: ${(props: Color) => color[props.color]};

  color: #fff;
  font-size: 12px;
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

  svg {
    display: inherit;
  }
`;

export { Button, LinkButton, AnchorButton };
