import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Container } from '../../../components/Containers';

export function About(): JSX.Element {
  return (
    <Container>
      <Heading as="h1" size="lg">
        Sobre o Projeto
      </Heading>
    </Container>
  );
}
