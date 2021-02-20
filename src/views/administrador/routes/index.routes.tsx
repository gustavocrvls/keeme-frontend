import React from 'react';
// import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../../routes';

import DashboardAdministrador from '../pages/Dashboard';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute
        path="/administrador/home"
        component={DashboardAdministrador}
      />
      <PrivateRoute
        path="/administrador/cadastrar-coordenador"
        component={DashboardAdministrador}
      />
    </>
  );
};

export default Routes;
