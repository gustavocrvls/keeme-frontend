import React, { ReactNode } from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

interface PageTitleProps {
  children: ReactNode;
  backTo: string;
}

export default function PageTitle({
  children,
  backTo,
}: PageTitleProps): JSX.Element {
  const history = useHistory();

  function goTo() {
    history.push(backTo);
  }

  return (
    <Flex alignItems="center" marginBottom="5">
      <IconButton
        aria-label="back-button"
        icon={<FiArrowLeft style={{ strokeWidth: 3 }} size="1rem" />}
        onClick={goTo}
        size="sm"
        marginRight="5"
      />
      <Heading as="h1" size="lg">
        {children}
      </Heading>
    </Flex>
  );
}
