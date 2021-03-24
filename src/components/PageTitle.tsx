import React, { ReactNode } from 'react';
import { Flex, Heading, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

interface PageTitleProps {
  children: ReactNode;
  backTo: string;
  actions?: ReactNode;
}

function PageTitle({ children, backTo, actions }: PageTitleProps): JSX.Element {
  const history = useHistory();

  function goTo() {
    history.push(backTo);
  }

  return (
    <Flex alignItems="center" marginBottom="5" justifyContent="space-between">
      <Flex alignItems="center">
        <Tooltip label="Voltar" aria-label="Voltar" hasArrow>
          <IconButton
            aria-label="back-button"
            icon={<FiArrowLeft style={{ strokeWidth: 3 }} size="1rem" />}
            onClick={goTo}
            size="sm"
            marginRight="5"
            colorScheme="teal"
          />
        </Tooltip>
        <Heading as="h1" size="lg">
          {children}
        </Heading>
      </Flex>
      <Stack direction="row" spacing="2">
        {actions}
      </Stack>
    </Flex>
  );
}

PageTitle.defaultProps = {
  actions: <></>,
};

export default PageTitle;
