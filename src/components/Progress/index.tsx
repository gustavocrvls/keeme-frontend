import { Box } from '@chakra-ui/react';

interface ProgressProps {
  completed: number;
}

const Progress = (props: ProgressProps): JSX.Element => {
  const { completed } = props;

  return (
    <Box pos="relative" pt="10">
      <Box
        position="absolute"
        h={5}
        w="100%"
        borderRadius={16}
        bgColor="#d3e2e5"
      />
      <Box
        pos="absolute"
        h={5}
        borderRadius={16}
        bgColor="#31878c"
        w={completed}
      />
    </Box>
  );
};

export { Progress };
