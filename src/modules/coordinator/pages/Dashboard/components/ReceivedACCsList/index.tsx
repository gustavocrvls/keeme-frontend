import {
  Box,
  Flex,
  IconButton,
  Skeleton,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { ReceivedACCsListProps } from './dtos';

export function ReceivedACCsList({
  accs,
  isLoading,
}: ReceivedACCsListProps): JSX.Element {
  const history = useHistory();

  return (
    <>
      <Flex justifyContent="flex-end">{`${accs.length || 0} ACCs`}</Flex>
      <div>
        {!isLoading ? (
          <UnorderedList listStyleType="none" margin="0">
            {accs.length &&
              accs.map(acc => (
                <li key={acc.id}>
                  <Flex
                    backgroundColor="white"
                    padding="3"
                    marginBottom="3"
                    justifyContent="space-between"
                    boxShadow="md"
                    borderRadius="md"
                    alignItems="center"
                  >
                    <Box>
                      <Flex>
                        <strong>{acc.user.name}</strong>
                      </Flex>
                      <Text fontSize="sm">{acc.acc_type.name}</Text>
                    </Box>
                    <IconButton
                      aria-label="choose-acc"
                      icon={<FiArrowRight size={20} />}
                      variant="ghost"
                      onClick={() => {
                        history.push(`/coordinator/acc-details/${acc.id}`);
                      }}
                    />
                  </Flex>
                </li>
              ))}
          </UnorderedList>
        ) : (
          <Stack>
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
          </Stack>
        )}
      </div>
    </>
  );
}
