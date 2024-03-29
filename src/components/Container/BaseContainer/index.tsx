import { Box } from '@chakra-ui/react';
import { BaseContainerProps } from './dtos';

export const BaseContainer = (props: BaseContainerProps): JSX.Element => {
  const { children } = props;
  return (
    <Box maxW={1024} m="0 auto" pt={10} boxSizing="border-box">
      <div style={{ margin: '0 10px' }}>{children}</div>
    </Box>
  );
};
