import { Box, Flex, IconButton, SimpleGrid, Tooltip } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ACC_STATUS } from '../../constants/ACCStatus';
import { ACCCardProps } from './dtos';

export function ACCCard({
  id,
  title,
  accType,
  points,
  quantity,
  status,
  to,
}: ACCCardProps): JSX.Element {
  function handleStatus() {
    switch (status.id) {
      case ACC_STATUS.APPROVED:
        return <strong style={{ color: 'teal' }}>{status.name}</strong>;

      case ACC_STATUS.UNDER_ANALYSIS:
        return <strong style={{ color: 'gray' }}>{status.name}</strong>;

      case ACC_STATUS.FAILED:
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
              {handleStatus()}
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      <Flex alignItems="center" marginLeft="5">
        <IconButton
          as={Link}
          to={to || `accs/${id}`}
          aria-label="choose-acc"
          icon={<FiArrowRight size={20} />}
          variant="ghost"
        />
      </Flex>
    </Flex>
  );
}
