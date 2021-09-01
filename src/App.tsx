import { ChakraProvider } from '@chakra-ui/react';
import Routes from './routes';
import { SidebarProvider } from './hooks/useSidebar';
import { SessionProvider } from './hooks/useSession';

import theme from './styles/theme';

function App(): JSX.Element {
  return (
    <>
      <ChakraProvider theme={theme}>
        <div id="app-content">
          <SessionProvider>
            <SidebarProvider>
              <Routes />
            </SidebarProvider>
          </SessionProvider>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
