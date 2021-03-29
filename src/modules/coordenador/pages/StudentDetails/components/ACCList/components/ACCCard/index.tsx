/* eslint-disable camelcase */
import { Box, Flex, IconButton, SimpleGrid, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import statusDaAcc from '../../../../../../../../constants/StatusDaACC';
import { ACCCardProps } from './dtos';

export function ACCCard({
  id,
  title,
  accType,
  points,
  quantity,
  status,
}: ACCCardProps): JSX.Element {
  const history = useHistory();

  function handleStatus() {
    switch (status.id) {
      case statusDaAcc.APROVADA:
        return <strong style={{ color: 'teal' }}>{status.nome}</strong>;

      case statusDaAcc.EM_ANALISE:
        return <strong style={{ color: 'gray' }}>{status.nome}</strong>;

      case statusDaAcc.NEGADA:
        return <strong style={{ color: 'tomato' }}>{status.nome}</strong>;
      default:
        return <></>;
    }
  }

  return (
    <Flex
      backgroundColor="white"
      boxShadow="lg"
      padding="3"
      borderRadius="md"
      justifyContent="space-between"
    >
      <Flex direction="column" width="100%">
        <Box>
          <strong>{title}</strong>
        </Box>
        <Box>
          <SimpleGrid columns={[1, 3]}>
            <Box>
              <span>{`${accType.unidade_de_medida.nome}s: `}</span>
              <strong>{quantity}</strong>
            </Box>
            <Box>
              <span>{`Pontos: `}</span>
              <strong>{points}</strong>
            </Box>
            <Box>
              <span>{`Status: `}</span>
              {handleStatus()}
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      <Flex alignItems="center" marginLeft="5">
        <Tooltip label="Detalhes da ACC" hasArrow>
          <IconButton
            aria-label="choose-acc"
            icon={<FiArrowRight size={20} />}
            variant="ghost"
            onClick={() => {
              history.push(`/coordinator/acc-details/${id}`);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}