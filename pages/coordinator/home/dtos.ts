export interface IReceivedACC {
  id: number;
  quantity: number;
  user: {
    id: number;
    name: string;
    cpf: string;
  };
  acc_type: {
    id: number;
    name: string;
    unity_of_measurement: {
      id: number;
      name: string;
    };
  };
}
