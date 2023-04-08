import { Flex, Heading, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { PageTitleProps } from './dtos';

export function PageTitle({ children, actions }: PageTitleProps): JSX.Element {
  const router = useRouter()

  return (
    <Flex alignItems="center" marginBottom="5" justifyContent="space-between">
      <Flex alignItems="center">
        <Tooltip label="Voltar" aria-label="Voltar" hasArrow>
          <IconButton
            aria-label="back-button"
            icon={<FiArrowLeft style={{ strokeWidth: 3 }} size="1rem" />}
            onClick={router.back}
            size="sm"
            marginRight="5"
            colorScheme="teal"
          />
        </Tooltip>
        <Heading as="h1" size="lg">
          {children}
        </Heading>
      </Flex>
      {actions && (
        <Stack direction="row" spacing="2">
          {actions}
        </Stack>
      )}
    </Flex>
  );
}
