/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import api from '../../../../services/api';
import { USERID_KEY } from '../../../../services/auth';
import PageTitle from '../../../../components/PageTitle';
import { CardAcc } from './components/CardACC';

type ACC = {
  id: number;
  pontos: number;
  quantidade: number;
  sobre: string;
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
};

export default function MinhasACCs(): JSX.Element {
  const [ACCs, setACCs] = useState<ACC[]>([]);

  useEffect(() => {
    async function loadACCs(): Promise<void> {
      const response = await api.get(
        `accs/user/${sessionStorage.getItem(USERID_KEY)}/completo`,
      );
      setACCs(response.data.accs);
    }
    loadACCs();
  }, []);

  return (
    <>
      <PageTitle backTo="/discente/home">Minhas ACCs</PageTitle>

      <UnorderedList marginLeft="0" listStyleImage="none">
        {ACCs.map(acc => (
          <ListItem key={acc.id} marginBottom="10" display="flex">
            <CardAcc
              id={acc.id}
              pontos={acc.pontos}
              quantidade={acc.quantidade}
              statusDaAcc={acc.status_da_acc}
              tipoDeAcc={acc.tipo_de_acc}
            />
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
}
