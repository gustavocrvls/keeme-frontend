import React from 'react';
import { PrivateRoute } from '../../../routes';

import CadastrarAcc from '../pages/CadastrarACC';
import Dashboard from '../pages/Dashboard';
import DetalhesDaAcc from '../pages/DetalhesDaACC';
import DetalhesDaPontuacao from '../pages/MinhasACCs';
import TiposDeACC from '../pages/TiposDeACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/discente/home" component={Dashboard} />
      <PrivateRoute path="/discente/tipos-de-acc" component={TiposDeACC} />
      <PrivateRoute path="/discente/cadastrar-acc" component={CadastrarAcc} />
      <PrivateRoute
        path="/discente/minhas-accs"
        exact
        component={DetalhesDaPontuacao}
      />
      <PrivateRoute
        path="/discente/minhas-accs/acc/:id"
        component={DetalhesDaAcc}
      />
    </>
  );
};

export default Routes;
