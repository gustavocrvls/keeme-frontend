import {
  Box,
  Button,
  Heading,
  ListItem,
  Skeleton,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ACCCard } from '../../../MinhasACCs/components/ACCCard';
import { LastSendsProps } from './dtos';

export function LastSends({ accs, isLoading }: LastSendsProps): JSX.Element {
  const history = useHistory();

  return (
    <>
      <Heading as="h2" size="md" marginBottom="5">
        Últimos Envios
      </Heading>

      {isLoading ? (
        <Stack spacing="3">
          <Skeleton height={70} borderRadius="md" />
          <Skeleton height={70} borderRadius="md" />
          <Skeleton height={70} borderRadius="md" />
        </Stack>
      ) : (
        <>
          {accs.length ? (
            <UnorderedList styleType="none" margin="0">
              {accs.map((acc, index) => {
                if (index <= 3)
                  return (
                    <ListItem key={acc.id} marginBottom="3">
                      <ACCCard
                        id={acc.id}
                        title={acc.acc_type.name}
                        accType={acc.acc_type}
                        points={acc.acc_variant.points_per_unity * acc.quantity}
                        quantity={acc.quantity}
                        status={acc.acc_status}
                      />
                    </ListItem>
                  );
                return <></>;
              })}
            </UnorderedList>
          ) : (
            <>
              <Box color="gray.500">
                Não há nada ainda... Que tal começar cadastrando uma
                <Button
                  variant="link"
                  marginLeft="1"
                  textDecoration="underline"
                  onClick={() => {
                    history.push('new-acc');
                  }}
                >
                  {` nova ACC?`}
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
