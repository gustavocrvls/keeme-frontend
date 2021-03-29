import {
  Box,
  ListItem,
  Skeleton,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { ACCCard } from './components/ACCCard';
import { ACCListProps } from './dtos';

export function ACCList({ accs, isLoading }: ACCListProps): JSX.Element {
  return (
    <>
      {!isLoading ? (
        <UnorderedList marginLeft="0" styleType="none">
          {accs.length > 0 ? (
            <>
              {accs.map(acc => (
                <ListItem key={acc.id} marginBottom="3">
                  <ACCCard
                    id={acc.id}
                    title={acc.tipo_de_acc.nome}
                    accType={acc.tipo_de_acc}
                    points={
                      acc.variante_de_acc.pontos_por_unidade * acc.quantidade
                    }
                    quantity={acc.quantidade}
                    status={acc.status_da_acc}
                  />
                </ListItem>
              ))}
            </>
          ) : (
            <>
              <Box color="gray.500">
                O discente ainda não possui ACCs cadastradas.
              </Box>
            </>
          )}
        </UnorderedList>
      ) : (
        <Stack spacing="3">
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
        </Stack>
      )}
    </>
  );
}
