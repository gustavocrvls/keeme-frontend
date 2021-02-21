import React from 'react';
// import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../../routes';

import Dashboard from '../pages/Dashboard';
import CadastrarCoordenador from '../pages/CadastrarCoordenador';
import TiposDeACC from '../pages/TiposDeACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/administrador/home" component={Dashboard} />
      <PrivateRoute
        path="/administrador/cadastrar-coordenador"
        component={CadastrarCoordenador}
      />
      <PrivateRoute path="/administrador/tipos-de-acc" component={TiposDeACC} />
    </>
  );
};

export default Routes;
