import { IStudent } from '../../dto';

export interface SearchStudentsListProps {
  students: IStudent[];
  isLoading: boolean;
}
