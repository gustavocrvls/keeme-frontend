import { Stack, Button } from '@chakra-ui/react';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (newValue: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps): JSX.Element {
  return (
    <Stack direction="row" justifyContent="center" marginTop="10">
      {[...Array(totalPages * 2).keys()]
        .slice(currentPage > 3 ? currentPage - 3 : 0)
        .splice(0, 5)
        .map(value => (
          <Button
            colorScheme={currentPage === value + 1 ? 'teal' : 'gray'}
            onClick={() => setCurrentPage(value + 1)}
          >
            {value + 1}
          </Button>
        ))}
    </Stack>
  );
}
