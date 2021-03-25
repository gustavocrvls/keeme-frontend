/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ListItem,
  Skeleton,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import api from '../../../../services/api';
import { USERID_KEY } from '../../../../services/auth';
import PageTitle from '../../../../components/PageTitle';
import { ACCCard } from './components/ACCCard';
import { notifyError } from '../../../../components/Notifications';
import { Pagination } from '../../../../components/Pagination';

type ACC = {
  id: number;
  pontos: number;
  quantidade: number;
  descricao: string;
  status_da_acc: {
    id: number;
    nome: string;
  };
  tipo_de_acc: {
    id: number;
    nome: string;
    unidade_de_medida: {
      id: number;
      nome: string;
    };
  };
  variante_de_acc: {
    id: number;
    descricao: string;
    pontos_por_unidade: number;
  };
};

export default function MinhasACCs(): JSX.Element {
  const [accs, setACCs] = useState<ACC[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const history = useHistory();

  async function loadACCs(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get(`accs`, {
        params: {
          usuario: sessionStorage.getItem(USERID_KEY),
          limit: 5,
          page: currentPage,
        },
      });
      setACCs(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      notifyError('Não foi possível carregar as ACCs.');
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   loadACCs();
  // }, []);

  useEffect(() => {
    loadACCs();
  }, [currentPage]);

  return (
    <>
      <PageTitle>Minhas ACCs</PageTitle>
      {!isLoading ? (
        <UnorderedList marginLeft="0" styleType="none">
          {accs.length > 0 ? (
            <>
              {accs.map(acc => (
                <ListItem key={acc.id} marginBottom="3">
                  <ACCCard
                    id={acc.id}
                    title={acc.tipo_de_acc.nome}
                    description={acc.descricao}
                    accType={acc.tipo_de_acc}
                    points={
                      acc.variante_de_acc.pontos_por_unidade * acc.quantidade
                    }
                    quantity={acc.quantidade}
                    status={acc.status_da_acc}
                  />
                </ListItem>
              ))}
            </>
          ) : (
            <>
              <Box color="gray.500">
                Que vazio! Que tal começar cadastrando uma
                <Button
                  variant="link"
                  marginLeft="1"
                  textDecoration="underline"
                  onClick={() => {
                    history.push('cadastrar-acc');
                  }}
                >
                  {` Nova ACC?`}
                </Button>
              </Box>
            </>
          )}
        </UnorderedList>
      ) : (
        <Stack spacing="3">
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
          <Skeleton width="100%" height="72px" />
        </Stack>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
