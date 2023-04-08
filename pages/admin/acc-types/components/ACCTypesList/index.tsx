import {
  Box,
  ListItem,
  Skeleton,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { ACCTypeCard } from './components/ACCTypeCard';
import { ACCTypesListProps } from './dtos';

export function ACCTypesList({
  accTypes,
  isLoading,
  editACCType,
  deleteACCType,
}: ACCTypesListProps): JSX.Element {
  return (
    <>
      {!isLoading ? (
        <UnorderedList marginLeft="0" styleType="none">
          {accTypes.length > 0 ? (
            <>
              {accTypes.map(accType => (
                <ListItem key={accType.id} marginBottom="3">
                  <ACCTypeCard
                    accType={accType}
                    deleteACCType={deleteACCType}
                    editACCType={editACCType}
                  />
                </ListItem>
              ))}
            </>
          ) : (
            <>
              <Box color="gray.500">Ainda não há tipos de ACC cadastrados.</Box>
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
