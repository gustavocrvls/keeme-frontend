export interface ACCType {
  id: number;
  name: string;
  point_limit: number;
  unity_of_measurement: {
    id: number;
    name: string;
  };
  points_per_unity: number;
  acc_variants: {
    id: number;
    description: string;
    points_per_unity: 0;
  }[];
}
