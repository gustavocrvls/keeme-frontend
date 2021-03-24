import { Box, Heading, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Container } from '../../../components/Containers';
import PageTitle from '../../../components/PageTitle';

export function Feedback(): JSX.Element {
  return (
    <Container>
      <PageTitle>Feedback</PageTitle>
      <Textarea />
    </Container>
  );
}
