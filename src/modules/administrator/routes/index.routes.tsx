import React from 'react';
// import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../../routes';

import { Dashboard } from '../pages/Dashboard';
import CadastrarCoordenador from '../pages/CadastrarCoordenador';
import TiposDeACC from '../pages/TiposDeACC';
import CadastrarTipoDeACC from '../pages/CadastrarTipoDeACC';
import EditarTipoDeACC from '../pages/EditarTipoDeACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/administrator/home" component={Dashboard} />
      <PrivateRoute
        path="/administrator/create-coordinator"
        component={CadastrarCoordenador}
      />
      <PrivateRoute path="/administrator/tipos-de-acc" component={TiposDeACC} />
      <PrivateRoute
        path="/administrator/cadastrar-tipo-de-acc"
        component={CadastrarTipoDeACC}
      />
      <PrivateRoute
        path="/administrator/editar-tipo-de-acc/:id"
        component={EditarTipoDeACC}
      />
    </>
  );
};

export default Routes;
