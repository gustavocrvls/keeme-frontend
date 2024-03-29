import {
  Box,
  Flex,
  IconButton,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { SearchStudentsListProps } from './dtos';

export function SearchStudentsList({
  students,
  isLoading,
}: SearchStudentsListProps): JSX.Element {
  const history = useHistory();

  return (
    <div>
      {!isLoading ? (
        <UnorderedList listStyleType="none" margin="0">
          {students.map(student => (
            <li key={student.id}>
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
                  <strong>{student.name}</strong>
                  <Text fontSize="sm">{student.registration}</Text>
                </Box>

                <Tooltip label="Detalhes do discente" hasArrow>
                  <IconButton
                    aria-label="choose-user"
                    icon={<FiArrowRight size={20} />}
                    variant="ghost"
                    onClick={() => {
                      history.push(`/coordinator/search-student/${student.id}`);
                    }}
                  />
                </Tooltip>
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
        </Stack>
      )}
    </div>
  );
}
