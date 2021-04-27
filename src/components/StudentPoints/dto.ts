export interface StudentPointsProps {
  isLoading: boolean;
  summary: {
    approved_points: number;
    under_analysis: number;
    failed_points: number;
  };
  progress: number;
}
