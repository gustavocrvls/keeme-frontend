import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

const closeAfter = 1000 * 5; // 5 seconds

export function notifySuccess(text: string): void {
  toast({
    description: text,
    status: 'success',
    duration: closeAfter,
    isClosable: true,
    position: 'bottom-right',
  });
}

export function notifyError(text: string): void {
  toast({
    description: text,
    status: 'error',
    duration: closeAfter,
    isClosable: true,
    position: 'bottom-right',
  });
}

export function notifyWarning(text: string): void {
  toast({
    description: text,
    status: 'warning',
    duration: closeAfter,
    isClosable: true,
    position: 'bottom-right',
  });
}
