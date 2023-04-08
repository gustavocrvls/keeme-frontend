export type Student = {
  id: number;
  name: string;
  username: string;
  registration: string;
  course: {
    id: number;
    name: string;
  };
};

export interface SearchStudentsListProps {
  students: Student[];
  isLoading: boolean;
}
