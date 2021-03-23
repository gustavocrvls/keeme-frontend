/* eslint-disable camelcase */
import React from 'react';
import { Box, Flex, UnorderedList, ListItem } from '@chakra-ui/react';

import { Progress } from '../../../../../components/Progress';
import { calcularProgresso } from '../../../../../utils/calculos';

interface AccDetails {
  name: string;
  limit: number;
  measurementUnity: string;
  pointsPerUnity: number;
  completed: number;
  variants: {
    id: number;
    descricao: string;
    pontos_por_unidade: 0;
  }[];
}

const CardTipoDeACC = (props: AccDetails): JSX.Element => {
  const {
    name,
    limit,
    measurementUnity,
    pointsPerUnity,
    completed,
    variants,
  } = props;
  return (
    <Box backgroundColor="white" boxShadow="lg" padding="3" borderRadius="md">
      <Box>
        <strong>{name}</strong>
      </Box>
      <Flex
        justifyContent="space-between"
        alignItems={['flex-start', 'flex-end']}
        flexDirection={['column', 'row']}
      >
        <UnorderedList listStyleType="none" margin="0">
          <li>
            <span>Limite de pontos:</span>
            <strong>{` ${limit}`}</strong>
          </li>

          {variants.length <= 1 ? (
            <li>
              <span>{`Pontos por ${measurementUnity}:`}</span>
              <strong>{` ${variants[0].pontos_por_unidade}`}</strong>
            </li>
          ) : (
            <li>
              <span>{`Pontos por ${measurementUnity}:`}</span>
              <UnorderedList>
                {variants.map(variant => (
                  <ListItem marginLeft="5">
                    <span>{`${variant.descricao}: `}</span>
                    <strong>{variant.pontos_por_unidade}</strong>
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
      <Progress completed={calcularProgresso(limit, completed)} />
    </Box>
  );
};

export default CardTipoDeACC;
