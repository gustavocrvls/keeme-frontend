import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useSidebar } from '../../hooks/useSidebar';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps): JSX.Element => {
  const { isSidebarAwaysShowed } = useSidebar();

  return (
    <div style={isSidebarAwaysShowed ? { marginLeft: 250 } : {}}>
      <Box maxW={1024} m="0 auto" pt={10} boxSizing="border-box">
        <div style={{ margin: '0 10px' }}>{children}</div>
      </Box>
    </div>
  );
};
