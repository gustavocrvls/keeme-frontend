import {
  Box,
  Flex,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { ACCCardProps } from './dtos';

export function ACCTypeCard({
  accType,
  editACCType,
  deleteACCType,
}: ACCCardProps): JSX.Element {
  return (
    <Flex
      backgroundColor="white"
      boxShadow="lg"
      padding="3"
      borderRadius="md"
      justifyContent="space-between"
    >
      <Box>
        <Box>
          <strong>{accType.name}</strong>
        </Box>
        <Box marginBottom="3" color="gray.600" fontSize="sm">
          {accType.description}
        </Box>
        <Flex
          justifyContent="space-between"
          alignItems={['flex-start', 'flex-end']}
          flexDirection={['column', 'row']}
          fontSize="sm"
        >
          <UnorderedList listStyleType="none" margin="0">
            <li>
              <span>Limite de pontos:</span>
              <strong>{` ${accType.point_limit}`}</strong>
            </li>

            {accType.acc_variants.length <= 1 ? (
              <li>
                <span>{`Pontos por ${accType.unity_of_measurement.name}:`}</span>
                <strong>{` ${accType.acc_variants[0].points_per_unity}`}</strong>
              </li>
            ) : (
              <li>
                <span>{`Pontos por ${accType.unity_of_measurement.name}:`}</span>
                <UnorderedList>
                  {accType.acc_variants.map(variant => (
                    <ListItem marginLeft="5">
                      <span>{`${variant.description}: `}</span>
                      <strong>{variant.points_per_unity}</strong>
                    </ListItem>
                  ))}
                </UnorderedList>
              </li>
            )}
          </UnorderedList>
        </Flex>
      </Box>
      <Stack alignItems="flex-start" marginLeft="5" spacing="2" direction="row">
        <Tooltip label="Editar tipo de ACC" hasArrow>
          <IconButton
            aria-label="edit acc type"
            icon={<FiEdit size={18} />}
            variant="ghost"
            size="sm"
            onClick={() => editACCType(accType.id)}
          />
        </Tooltip>

        <Tooltip label="Excluir tipo de ACC" hasArrow>
          <IconButton
            aria-label="delete acc type"
            icon={<FiTrash size={18} />}
            colorScheme="red"
            variant="ghost"
            size="sm"
            onClick={() => deleteACCType(accType.id)}
          />
        </Tooltip>
      </Stack>
    </Flex>
  );
}
