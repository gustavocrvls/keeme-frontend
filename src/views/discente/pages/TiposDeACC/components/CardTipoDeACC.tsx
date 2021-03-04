import { Box, Flex, UnorderedList } from '@chakra-ui/react';
import React from 'react';

import { Progress } from '../../../../../components/Progress';
import { calcularProgresso } from '../../../../../utils/calculos';

interface AccDetails {
  name: string;
  limit: number;
  measurementUnity: string;
  pointsPerUnity: number;
  completed: number;
}

const CardTipoDeACC = (props: AccDetails): JSX.Element => {
  const { name, limit, measurementUnity, pointsPerUnity, completed } = props;
  return (
    <Box backgroundColor="white" boxShadow="lg" padding="3" borderRadius="md">
      <Box>
        <strong>{name}</strong>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <UnorderedList listStyleType="none" margin="0">
          <li>
            <span>Limite de pontos:</span>
            <strong>{` ${limit}`}</strong>
          </li>
          <li>
            <span>{`Pontos por ${measurementUnity}:`}</span>
            <strong>{` ${pointsPerUnity}`}</strong>
          </li>
        </UnorderedList>

        <div>
          Quantidade Utilizada:
          <strong>{` ${completed}/${limit}`}</strong>
        </div>
      </Flex>
      <Progress completed={calcularProgresso(limit, completed)} />
    </Box>
  );
};

export default CardTipoDeACC;
