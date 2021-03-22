import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Noto Sans, system-ui, sans-serif',
    heading: 'Noto Sans, system-ui, sans-serif',
    mono: 'Noto Sans, system-ui, sans-serif',
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
