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
