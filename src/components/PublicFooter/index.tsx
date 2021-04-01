/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import { Flex, Link } from "@chakra-ui/react";

export function PublicFooter(): JSX.Element {
  return (
    <Flex
      justifyContent="center"
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
