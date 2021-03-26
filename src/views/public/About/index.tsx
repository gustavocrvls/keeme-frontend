import { Heading } from '@chakra-ui/react';
import React from 'react';
import { LimitedContainer } from '../../../components/Containers';
import PageTitle from '../../../components/PageTitle';

export function About(): JSX.Element {
  return (
    <LimitedContainer>
      <PageTitle>Sobre o Projeto</PageTitle>

      <Heading as="h2" size="md">
        O que são ACCs?
      </Heading>
    </LimitedContainer>
  );
}
