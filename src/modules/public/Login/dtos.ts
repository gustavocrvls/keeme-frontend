export interface LoginResponse {
  auth: boolean;
  data: {
    course?: {
      id: number;
      name: string;
    };
    profile: {
      id: number;
      name: string;
    };
    name: string;
    id: number;
  };
}
