export interface AlertDeleteACCTypeProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (isAlertOpen: boolean) => void;
  setACCTypeToBeDeleted: (id: number) => void;
  deleteACCType: () => void;
}
