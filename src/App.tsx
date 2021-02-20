import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Routes from './routes';

import '../node_modules/noty/lib/noty.css';
import 'noty/lib/themes/nest.css';

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
