/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { ListItem, Skeleton, Stack, UnorderedList } from '@chakra-ui/react';

import PageTitle from '../../../../components/PageTitle';

import { USERID_KEY } from '../../../../services/auth';
import api from '../../../../services/api';
import CardTipoDeACC from './components/CardTipoDeACC';
import { notifyError } from '../../../../components/Notifications';

interface TipoDeAcc {
  id: number;
  nome: string;
  limite_de_pontos: number;
  completed: number;
  pontuacao: number;
  unidade_de_medida: {
    nome: string;
  };
  pontos_por_unidade: number;
  variantes_de_acc: {
    id: number;
    descricao: string;
    pontos_por_unidade: 0;
  }[];
}

export default function Home(): JSX.Element {
  const [tiposDeACC, setTiposDeACC] = useState<Array<TipoDeAcc>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        setIsLoading(true);
        const response = await api.get(
          `tipos-de-acc/usuario/${sessionStorage.getItem(USERID_KEY)}`,
        );

        setTiposDeACC(response.data);
      } catch (err) {
        notifyError('Não foi possível carregar as informações :(');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <PageTitle>Tipos de ACC</PageTitle>

      {!isLoading ? (
        <UnorderedList margin="0" listStyleType="none">
          {tiposDeACC.map(tipo => (
            <ListItem marginBottom="3" key={tipo.id}>
              <CardTipoDeACC
                name={tipo.nome}
                limit={tipo.limite_de_pontos}
                completed={tipo.pontuacao ? tipo.pontuacao : 0}
                measurementUnity={tipo.unidade_de_medida.nome}
                pointsPerUnity={tipo.pontos_por_unidade}
                variants={tipo.variantes_de_acc}
              />
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Stack spacing="3">
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
          <Skeleton width="100%" height="100px" />
        </Stack>
      )}
    </>
  );
}
