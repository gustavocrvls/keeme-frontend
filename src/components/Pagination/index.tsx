import { Stack, Button, IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
      {totalPages > 5 && (
        <Tooltip
          label="Primeira página"
          aria-label="first-page"
          hasArrow
          placement="top"
        >
          <IconButton
            aria-label="first-page"
            icon={<FiChevronLeft />}
            onClick={() => setCurrentPage(1)}
          />
        </Tooltip>
      )}
      {[...Array(totalPages).keys()]
        .slice(totalPages > 5 && currentPage > 3 ? currentPage - 3 : 0)
        .splice(0, 5)
        .map(value => (
          <Button
            colorScheme={currentPage === value + 1 ? 'teal' : 'gray'}
            onClick={() => setCurrentPage(value + 1)}
          >
            {value + 1}
          </Button>
        ))}
      {totalPages > 5 && (
        <Tooltip
          label="Última página"
          aria-label="last-page"
          hasArrow
          placement="top"
        >
          <IconButton
            aria-label="first-page"
            icon={<FiChevronRight />}
            onClick={() => setCurrentPage(totalPages)}
          />
        </Tooltip>
      )}
    </Stack>
  );
}
