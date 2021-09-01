export interface ACCTypeCardProps {
  name: string;
  description: string;
  limit: number;
  measurementUnity: string;
  completed: number;
  variants: {
    id: number;
    description: string;
    points_per_unity: number;
  }[];
}
