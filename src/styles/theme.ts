import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Noto Sans, system-ui, sans-serif',
    heading: 'Noto Sans, system-ui, sans-serif',
    mono: 'Noto Sans, system-ui, sans-serif',
  },
  styles: {
    global: {
      '*::-webkit-scrollbar-track': {
        borderRadius: '10px',
        backgroundColor: '#F5F5F5',
      },

      '*::-webkit-scrollbar': {
        width: '8px',
        backgroundColor: '#F5F5F5',
      },

      '*::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        backgroundColor: '#c9c9c9',
      },
    },
  },
});

export default theme;
