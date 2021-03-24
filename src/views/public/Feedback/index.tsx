import { Box, Heading, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Container } from '../../../components/Containers';

export function Feedback(): JSX.Element {
  return (
    <Container>
      <Heading as="h1" size="lg">
        Feedback
      </Heading>
      <Textarea />
    </Container>
  );
}
