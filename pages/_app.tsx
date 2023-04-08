import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
// import { SidebarProvider } from 'hooks/useSidebar';
import { SessionProvider } from 'hooks/useSession';
import theme from 'styles/theme';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SessionProvider>
          {/* <SidebarProvider> */}
          <Component {...pageProps} />
          {/* </SidebarProvider> */}
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}
