import { Box, Flex, UnorderedList, ListItem } from '@chakra-ui/react';
import { Progress } from '../../../../../../components/Progress';
import { calculateProgress } from '../../../../../../utils/calculations';
import { ACCTypeCardProps } from './dtos';

export function ACCTypeCard({
  name,
  description,
  limit,
  measurementUnity,
  completed,
  variants,
}: ACCTypeCardProps): JSX.Element {
  return (
    <Box backgroundColor="white" boxShadow="lg" padding="3" borderRadius="md">
      <Box>
        <strong>{name}</strong>
      </Box>
      <Box marginBottom="3" color="gray.600" fontSize="sm">
        {description}
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
            <strong>{` ${limit}`}</strong>
          </li>

          {variants.length <= 1 ? (
            <li>
              <span>{`Pontos por ${measurementUnity}:`}</span>
              <strong>{` ${variants[0].points_per_unity}`}</strong>
            </li>
          ) : (
            <li>
              <span>{`Pontos por ${measurementUnity}:`}</span>
              <UnorderedList>
                {variants.map(variant => (
                  <ListItem marginLeft="5" key={variant.id}>
                    <span>{`${variant.description}: `}</span>
                    <strong>{variant.points_per_unity}</strong>
                  </ListItem>
                ))}
              </UnorderedList>
            </li>
          )}
        </UnorderedList>
        <div>
          Quantidade Utilizada:
          <strong>{` ${completed}/${limit}`}</strong>
        </div>
      </Flex>
      <Progress completed={calculateProgress(limit, completed)} />
    </Box>
  );
}
