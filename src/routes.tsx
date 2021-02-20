/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';


import Header from './components/Header';
import Login from './views/Login';
import { isAuthenticated } from './services/auth';
import { notifyError } from './utils/Notifications';
import { Container } from './components/Containers';

import DiscenteRoutes from './views/discente/routes/index.routes';
import CoordenadorRoutes from './views/coordenador/routes/index.routes';
import AdministradorRoutes from './views/administrador/routes/index.routes';

interface PrivateRouteProps {
  path: string;
  component: React.ComponentClass | any;
  exact?: boolean;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { component: Component, exact, path } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps =>
        isAuthenticated() ? (
          <>
            <Header />
            <Container>
              <Component {...routeProps} />
            </Container>
          </>
        ) : (
          <>
            {notifyError('Ops! Você precisa fazer login no sistema!')}
            <Redirect to={{ pathname: '/' }} />
          </>
        )}
    />
  );
}

PrivateRoute.defaultProps = {
  exact: false,
};

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />

        <Route path="/discente" component={DiscenteRoutes} />
        <Route path="/coordenador" component={CoordenadorRoutes} />
        <Route path="/administrador" component={AdministradorRoutes} />

        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
