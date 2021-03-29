/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import { notifyError } from './components/Notifications';

import { Container } from './components/Containers';
import Header from './components/Header';

import Login from './modules/Login';
import CriarPerfil from './modules/CriarPerfil';

import DiscenteRoutes from './modules/discente/routes/index.routes';
import CoordenadorRoutes from './modules/coordenador/routes/index.routes';
import AdministratorRoutes from './modules/administrator/routes/index.routes';
import { Sidebar } from './components/Sidebar';
import { About } from './modules/public/About';
import { Feedback } from './modules/public/Feedback';

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
            <Sidebar />
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
        <Route path="/criar-perfil" component={CriarPerfil} />

        <Route path="/about" component={About} />
        <Route path="/feedback" component={Feedback} />

        <Route path="/discente" component={DiscenteRoutes} />
        <Route path="/coordenador" component={CoordenadorRoutes} />
        <Route path="/coordinator" component={CoordenadorRoutes} />
        <Route path="/administrator" component={AdministratorRoutes} />

        {/* <Redirect to="/login" /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
