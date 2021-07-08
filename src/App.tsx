import { ChakraProvider } from '@chakra-ui/react';
import Routes from './routes';
import { SidebarProvider } from './hooks/useSidebar';

import theme from './styles/theme';

function App(): JSX.Element {
  return (
    <>
      <ChakraProvider theme={theme}>
        <div id="app-content">
          <SidebarProvider>
            <Routes />
          </SidebarProvider>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
