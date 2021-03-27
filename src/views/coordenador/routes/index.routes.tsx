import React from 'react';
import { PrivateRoute } from '../../../routes';

import { Dashboard } from '../pages/Dashboard';
import PesquisarDiscente from '../pages/PesquisarDiscente';
import DetalhesDaAccCoordenador from '../pages/DetalhesDaAcc';
import DetalhesDoDiscente from '../pages/DetalhesDoDiscente';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/coordenador/home" component={Dashboard} />
      <PrivateRoute
        path="/coordenador/pesquisar-discente"
        component={PesquisarDiscente}
      />
      <PrivateRoute
        path="/coordenador/detalhes-do-discente/:id"
        component={DetalhesDoDiscente}
      />
      <PrivateRoute
        path="/coordenador/detalhes-da-acc/:id"
        component={DetalhesDaAccCoordenador}
      />
    </>
  );
};

export default Routes;
