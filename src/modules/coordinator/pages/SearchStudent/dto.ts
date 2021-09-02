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
