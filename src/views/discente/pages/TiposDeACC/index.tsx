/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { ListItem, Skeleton, Stack, UnorderedList } from '@chakra-ui/react';

import PageTitle from '../../../../components/PageTitle';

import { USERID_KEY } from '../../../../services/auth';
import api from '../../../../services/api';
import CardTipoDeACC from './components/CardTipoDeACC';
import { notifyError } from '../../../../components/Notifications';

interface ACCTypes {
  id: number;
  name: string;
  description: string;
  approved_points: number;
  points_under_analisys: number;
  unit_of_measurement: {
    name: string;
  };
  point_limit: number;
  acc_variants: {
    id: number;
    description: string;
    points_per_unity: number;
  }[];
}

export default function Home(): JSX.Element {
  const [accTypes, setACCTypes] = useState<Array<ACCTypes>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        setIsLoading(true);
        const response = await api.get(
          `tipos-de-acc/user/${sessionStorage.getItem(USERID_KEY)}`,
        );

        setACCTypes(response.data.data);
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
          {accTypes.map(type => (
            <ListItem marginBottom="3" key={type.id}>
              <CardTipoDeACC
                name={type.name}
                limit={type.point_limit}
                completed={type.approved_points}
                measurementUnity={type.unit_of_measurement.name}
                variants={type.acc_variants}
                description={type.description}
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
