import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AlertDeleteACCTypeProps } from './dtos';

export function AlertDeleteACCType({
  isAlertOpen,
  setIsAlertOpen,
  setACCTypeToBeDeleted,
  deleteACCType,
}: AlertDeleteACCTypeProps): JSX.Element {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setACCTypeToBeDeleted(0)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Tipo de ACC
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja excluir o tipo de ACC? Essa ação não pode ser
            desfeita.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                setIsAlertOpen(false);
                setACCTypeToBeDeleted(0);
              }}
            >
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={deleteACCType} ml={3}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
