export interface ICourse {
  id: number;
  name: string;
}

export interface ParamTypes {
  id: string;
}

export interface IUser {
  id: number;
  name?: string;
  cpf?: string;
  email?: string;
  username?: string;
  password?: string;
  profile?: number;
  course?: number;
}
