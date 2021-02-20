/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import CadastrarAcc from './views/discente/page/CadastrarAcc';
import Dashboard from './views/discente/page/Dashboard';
import DetalhesDaAcc from './views/discente/page/DetalhesDaAcc';
import DetalhesDaPontuacao from './views/discente/page/DetalhesDaPontuacao';
import TiposDeAcc from './views/discente/page/TiposDeAcc';


import Login from './views/Login';
import { isAuthenticated } from './services/auth';
import { notifyError } from './utils/Notifications';
import { Container } from './components/Containers';

import DashboardCoordenador from './views/coordenador/pages/Dashboard';
import PesquisarDiscente from './views/coordenador/pages/PesquisarDiscente';
import DetalhesDaAccCoordenador from './views/coordenador/pages/DetalhesDaAcc';
import DetalhesDoDiscente from './views/coordenador/pages/DetalhesDoDiscente';

import DashboardAdministrador from './views/administrador/pages/Dashboard';

interface PrivateRouteProps {
  path: string;
  component: React.ComponentClass | any;
  exact?: boolean;
}

function PrivateRoute(props: PrivateRouteProps) {
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
        <PrivateRoute path="/home" component={Dashboard} />
        <PrivateRoute path="/discente/tipos-de-acc" component={TiposDeAcc} />
        <PrivateRoute path="/discente/cadastrar-acc" component={CadastrarAcc} />
        <PrivateRoute
          path="/discente/detalhes-da-pontuacao"
          exact
          component={DetalhesDaPontuacao}
        />
        <PrivateRoute
          path="/discente/detalhes-da-pontuacao/acc/:id"
          component={DetalhesDaAcc}
        />

        <PrivateRoute path="/coordenador/home" component={DashboardCoordenador} />
        <PrivateRoute path="/coordenador/pesquisar-discente" component={PesquisarDiscente} />
        <PrivateRoute path="/coordenador/detalhes-do-discente/:id" component={DetalhesDoDiscente} />
        <PrivateRoute path="/coordenador/detalhes-da-acc/:id" component={DetalhesDaAccCoordenador} />

        <PrivateRoute path="/administrador/home" component={DashboardAdministrador} />
        <PrivateRoute path="/administrador/cadastrar-coordenador" component={DashboardAdministrador} />

        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
