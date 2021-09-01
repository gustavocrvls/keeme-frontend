export type Course = {
  id: number;
  name: string;
};

export type ParamTypes = {
  id: string;
};

export type User = {
  id: number;
  name?: string;
  cpf?: string;
  email?: string;
  username?: string;
  password?: string;
  profile?: number;
  course?: number;
};

export type FormData = {
  name: string;
  username: string;
  email: string;
  course: string;
  password: string;
};
