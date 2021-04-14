import {
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { UsersListProps } from './dtos';

export function UsersList({
  users,
  editCoordinator,
  deleteCoordinator,
}: UsersListProps): JSX.Element {
  return (
    <UnorderedList listStyleType="none" margin="0" marginBottom="6">
      {users.map(user => (
        <li>
          <Flex
            boxShadow="md"
            marginBottom="3"
            padding="3"
            borderRadius="md"
            transition="all 0.2s"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <strong>{user.name}</strong>
              <Text fontSize="sm">{user.email}</Text>
            </Box>
            <Stack
              alignItems="flex-start"
              marginLeft="5"
              spacing="2"
              direction="row"
            >
              <Tooltip label="Editar" aria-label="Editar">
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Trash Icon"
                  icon={<FiEdit size={20} />}
                  onClick={() => editCoordinator(user.id)}
                />
              </Tooltip>
              <Tooltip label="Excluir" aria-label="Excluir">
                <IconButton
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  aria-label="Trash Icon"
                  icon={<FiTrash size={20} />}
                  onClick={() => deleteCoordinator(user.id)}
                />
              </Tooltip>
            </Stack>
          </Flex>
        </li>
      ))}
    </UnorderedList>
  );
}
