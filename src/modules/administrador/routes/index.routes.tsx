import React from 'react';
// import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../../routes';

import Dashboard from '../pages/Dashboard';
import CadastrarCoordenador from '../pages/CadastrarCoordenador';
import TiposDeACC from '../pages/TiposDeACC';
import CadastrarTipoDeACC from '../pages/CadastrarTipoDeACC';
import EditarTipoDeACC from '../pages/EditarTipoDeACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/administrador/home" component={Dashboard} />
      <PrivateRoute
        path="/administrador/cadastrar-coordenador"
        component={CadastrarCoordenador}
      />
      <PrivateRoute path="/administrador/tipos-de-acc" component={TiposDeACC} />
      <PrivateRoute
        path="/administrador/cadastrar-tipo-de-acc"
        component={CadastrarTipoDeACC}
      />
      <PrivateRoute
        path="/administrador/editar-tipo-de-acc/:id"
        component={EditarTipoDeACC}
      />
    </>
  );
};

export default Routes;
