export interface ACCCardProps {
  id: number;
  title: string;
  accType: {
    id: number;
    name: string;
    unity_of_measurement: {
      id: number;
      name: string;
    };
  };
  points: number;
  quantity: number;
  status: {
    id: number;
    name: string;
  };
  to?: string;
}
