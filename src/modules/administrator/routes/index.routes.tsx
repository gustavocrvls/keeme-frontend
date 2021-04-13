import React from 'react';
// import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../../routes';

import { Dashboard } from '../pages/Dashboard';
import { RegisterCoordinator } from '../pages/RegisterCoordenator';
import { ACCTypes } from '../pages/ACCTypes';
import CadastrarTipoDeACC from '../pages/CadastrarTipoDeACC';
import EditarTipoDeACC from '../pages/EditarTipoDeACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/administrator/home" component={Dashboard} />
      <PrivateRoute
        path="/administrator/register-coordinator"
        component={RegisterCoordinator}
      />
      <PrivateRoute path="/administrator/acc-types" component={ACCTypes} />
      <PrivateRoute
        path="/administrator/acc-types/new"
        component={CadastrarTipoDeACC}
      />
      <PrivateRoute
        path="/administrator/acc-types/update/:id"
        component={EditarTipoDeACC}
      />
    </>
  );
};

export default Routes;
