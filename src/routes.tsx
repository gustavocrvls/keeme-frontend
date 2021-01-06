import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import CadastrarAcc from './pages/modules/discente/CadastrarAcc/';
import Dashboard from './pages/modules/discente/Dashboard';
import TiposDeAcc from './pages/modules/discente/TiposDeAcc';

import Login from './pages/Login';

interface PrivateRouteProps {
  path: string,
  component: React.ComponentClass | any,
  exact?: boolean,
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, exact, path } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => (
        <>
          <Header />
          <Component {...routeProps} />
        </>
      )}
    />
  );
}

const Routes = () => {
  return (
    <BrowserRouter>    
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Dashboard} />
        <PrivateRoute path="/discente/tipos-de-acc" component={TiposDeAcc} />
        <PrivateRoute path="/discente/cadastrar-acc" component={CadastrarAcc} />

        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes;