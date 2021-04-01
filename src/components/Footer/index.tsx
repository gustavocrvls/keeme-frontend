/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import { Flex, Link } from "@chakra-ui/react";

export function Footer(): JSX.Element {
  return (
    <Flex
      justifyContent="center"
      position={['absolute']}
      color={['white', 'black']}
      bottom="0"
      right={['unset', 0]}
      margin="3"
      fontSize="sm"
    >
      developed with <del style={{ margin: '0 4px' }}>coffee</del> ❤ by
      <Link
        style={{ margin: '0 4px' }}
        href="https://github.com/gustavocrvls"
        isExternal
      >
        @gustavocrvls
      </Link>
    </Flex>
  );
}
