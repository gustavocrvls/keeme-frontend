import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Nunito, system-ui, sans-serif',
    heading: 'Nunito, system-ui, sans-serif',
    mono: 'Nunito, system-ui, sans-serif',
  },
  styles: {
    global: {
      body: {
        // bg: 'gray.50',
      },
    },
  },
});

export default theme;
