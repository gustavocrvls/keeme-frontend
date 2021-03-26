import React from 'react';
import { Box, createStandaloneToast } from '@chakra-ui/react';
import Noty from 'noty';

const NOTY_THEME = 'nest';
const toast = createStandaloneToast();

const notifySuccess = (text: string): any => {
  toast({
    title: 'Sucesso!',
    status: 'success',
    duration: 3000,
    isClosable: true,
    position: 'bottom-right',
    render: props => (
      <Box m={3} color="white" p={3} bg="teal.500" borderRadius="md">
        <p>
          <strong>Sucesso!</strong>
        </p>
        <p>{text}</p>
      </Box>
    ),
  });
};

function notifyError(text: string): void {
  toast({
    title: 'Sucesso!',
    status: 'success',
    duration: 3000,
    isClosable: true,
    position: 'bottom-right',
    render: props => (
      <Box m={3} color="white" p={3} bg="red.500" borderRadius="md">
        <p>
          <strong>Ops!</strong>
        </p>
        <p>{text}</p>
      </Box>
    ),
  });
}

function notifyWarning(text: string): void {
  toast({
    title: 'Sucesso!',
    status: 'warning',
    duration: 3000,
    isClosable: true,
    position: 'bottom-right',
    render: props => (
      <Box m={3} color="white" p={3} bg="yellow.500" borderRadius="md">
        <p>
          <strong>Ops!</strong>
        </p>
        <p>{text}</p>
      </Box>
    ),
  });
}

export { notifySuccess, notifyError, notifyWarning };
