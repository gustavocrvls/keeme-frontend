/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import { Flex, Link, Text } from '@chakra-ui/react';

export function Footer(): JSX.Element {
  return (
    <Flex
      as="footer"
      justify="center"
      fontSize="sm"
      padding="3"
      w="100%"
      textAlign="center"
      direction="column"
    >
      <Link as={Link} href="/about" style={{ margin: '0 4px' }}>
        <Text marginBottom="5">sobre o projeto</Text>
      </Link>
      <Text>
        developed with <del style={{ margin: '0 4px' }}>coffee</del>{' '}
        <Text as="span" color="red" marginRight="4px">
          ❤{' '}
        </Text>{' '}
        by
        <Link
          style={{ margin: '0 4px' }}
          href="https://github.com/gustavocrvls"
          isExternal
        >
          @gustavocrvls
        </Link>
      </Text>
    </Flex>
  );
}
