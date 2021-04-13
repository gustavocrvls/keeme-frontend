export interface IACCType {
  id: number;
  name: string;
  description: string;
  approved_points: number;
  points_under_analisys: number;
  unity_of_measurement: {
    name: string;
  };
  point_limit: number;
  acc_variants: {
    id: number;
    description: string;
    points_per_unity: number;
  }[];
}
