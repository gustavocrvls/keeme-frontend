export interface ACCCardProps {
  id: number;
  title: string;
  accType: {
    id: number;
    nome: string;
    unidade_de_medida: {
      id: number;
      nome: string;
    };
  };
  points: number;
  quantity: number;
  status: {
    id: number;
    nome: string;
  };
}
