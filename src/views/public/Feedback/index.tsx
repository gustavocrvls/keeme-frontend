import React from 'react';
import { Button, Flex, Textarea } from '@chakra-ui/react';
import { Container, LimitedContainer } from '../../../components/Containers';
import PageTitle from '../../../components/PageTitle';

export function Feedback(): JSX.Element {
  return (
    <LimitedContainer>
      <>
        <PageTitle>Feedback</PageTitle>
        <Textarea />
        <Flex justifyContent="center">
          <Button>Enviar</Button>
        </Flex>
      </>
    </LimitedContainer>
  );
}
