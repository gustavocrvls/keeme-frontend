export interface IUser {
  id: number;
  nome: string;
}

export interface ICourse {
  id: number;
  nome: string;
  usuarios: IUser[];
}
