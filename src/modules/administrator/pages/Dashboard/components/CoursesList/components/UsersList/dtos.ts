export interface IUser {
  id: number;
  name: string;
  email: string;
}
export interface UsersListProps {
  users: IUser[];
  editCoordinator: (id: number) => void;
  deleteCoordinator: (id: number) => void;
}
