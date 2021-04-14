/* eslint-disable camelcase */
import {
  Box,
  Flex,
  ListItem,
  SimpleGrid,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { GiPlainCircle } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import statusDaAcc from '../../../../../constants/StatusDaACC';

interface ACCCardProps {
  id: number;
  title: string;
  accType: {
    id: number;
    name: string;
    unity_of_measurement: {
      id: number;
      name: string;
    };
  };
  points: number;
  quantity: number;
  status: {
    id: number;
    name: string;
  };
}

export function ACCCard({
  id,
  title,
  accType,
  points,
  quantity,
  status,
}: ACCCardProps): JSX.Element {
  function handleStatus() {
    switch (status.id) {
      case statusDaAcc.APROVADA:
        return <strong style={{ color: 'teal' }}>{status.name}</strong>;

      case statusDaAcc.EM_ANALISE:
        return <strong style={{ color: 'gray' }}>{status.name}</strong>;

      case statusDaAcc.NEGADA:
        return <strong style={{ color: 'tomato' }}>{status.name}</strong>;
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
              <span>{`${accType.unity_of_measurement.name}s: `}</span>
              <strong>{quantity}</strong>
            </Box>
            <Box>
              <span>{`Pontos: `}</span>
              <strong>{points}</strong>
            </Box>
            <Box>
              <span>{`Status: `}</span>
              {/* <span style={{ color: 'red' }}>
                <GiPlainCircle />
              </span> */}
              {handleStatus()}
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      <Flex alignItems="center" marginLeft="5">
        <Link to={`minhas-accs/acc/${id}`}>
          <FiArrowRight size="20" />
        </Link>
      </Flex>
    </Flex>
  );
}
