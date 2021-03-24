import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Routes from './routes';

import './styles/global.scss';

import theme from './styles/theme';

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <div id="app-content">
        <Routes />
      </div>
    </ChakraProvider>
  );
}

export default App;
