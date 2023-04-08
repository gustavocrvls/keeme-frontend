export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ICourse {
  id: number;
  name: string;
  users: IUser[];
}

export interface CoursesListProps {
  courses: ICourse[];
  editCoordinator: (id: number) => void;
  deleteCoordinator: (id: number) => void;
}
