import { Box, Flex, Skeleton, Stack, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ReceivedACCsListProps } from './dtos';

export function ReceivedACCsList({
  accs,
  isLoading,
}: ReceivedACCsListProps): JSX.Element {
  return (
    <>
      <Flex justifyContent="flex-end">{`${accs.length || 0} ACCs`}</Flex>
      <div>
        {!isLoading ? (
          <UnorderedList listStyleType="none" margin="0">
            {accs.length &&
              accs.map(acc => (
                <Link to={`/coordenador/detalhes-da-acc/${acc.id}`}>
                  <li>
                    <Flex
                      backgroundColor="white"
                      padding="3"
                      marginBottom="3"
                      justifyContent="space-between"
                      boxShadow="md"
                      borderRadius="md"
                    >
                      <div>
                        <div>
                          <strong>{acc.usuario.nome}</strong>
                        </div>
                        <Box fontSize="sm">{acc.tipo_de_acc.nome}</Box>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <FiArrowRight size={20} />
                      </div>
                    </Flex>
                  </li>
                </Link>
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
