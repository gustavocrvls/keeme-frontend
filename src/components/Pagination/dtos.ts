export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (newValue: number) => void;
}
