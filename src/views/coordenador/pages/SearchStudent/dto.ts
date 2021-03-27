export interface IStudent {
  id: number;
  name: string;
  cpf: string;
  username: string;
  course: {
    id: number;
    name: string;
  };
}
