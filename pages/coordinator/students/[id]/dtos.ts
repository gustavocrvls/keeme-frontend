export interface IStudent {
  id: number;
  name: string;
  email: string;
  registration: string;
  username: string;
  course: {
    id: number;
    namse: string;
  };
}

export interface IACC {
  id: number;
  certificate_id: number;
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

export interface ISummary {
  approved_points: number;
  under_analysis: number;
  failed_points: number;
}

export interface ParamTypes {
  id: string;
}
