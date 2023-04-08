export interface IACC {
  id: number;
  points: number;
  quantity: number;
  description: string;
  acc_status: {
    id: number;
    name: string;
  };
  acc_type: {
    id: number;
    name: string;
    unity_of_measurement: {
      id: number;
      name: string;
    };
  };
  acc_variant: {
    id: number;
    description: string;
    points_per_unity: number;
  };
}

export interface IPoints {
  approved_points: 0;
  under_analysis: 0;
  failed_points: 0;
}
