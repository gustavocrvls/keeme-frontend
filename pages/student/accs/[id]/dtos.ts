export interface IACC {
  id: number;
  points: number;
  quantity: number;
  description: string;
  created_at: Date;
  certificate: string;
  certificate_url: string;
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
  acc_assessment: {
    id: number;
    created_at: Date;
    description: string;
    user: {
      id: number;
      name: string;
    };
  };
}

export interface ParamTypes {
  id: string;
}
