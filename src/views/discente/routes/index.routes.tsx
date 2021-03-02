import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../../../routes';

import CadastrarAcc from '../pages/CadastrarAcc';
import Dashboard from '../pages/Dashboard';
import DetalhesDaAcc from '../pages/DetalhesDaAcc';
import DetalhesDaPontuacao from '../pages/DetalhesDaPontuacao';
import TiposDeAcc from '../pages/TiposDeAcc';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/discente/home" component={Dashboard} />
      <PrivateRoute path="/discente/tipos-de-acc" component={TiposDeAcc} />
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
