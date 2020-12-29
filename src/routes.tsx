import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import TiposDeAcc from './pages/modules/discente/TiposDeAcc';
import Dashboard from './pages/modules/discente/Dashboard';
import Home from './pages/modules/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/discente/tipos-de-acc" component={TiposDeAcc} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes;