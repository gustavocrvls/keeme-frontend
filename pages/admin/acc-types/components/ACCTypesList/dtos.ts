import { IACCType } from '../../dtos';

export interface ACCTypesListProps {
  accTypes: IACCType[];
  isLoading: boolean;
  deleteACCType: (id: number) => void;
  editACCType: (id: number) => void;
}
