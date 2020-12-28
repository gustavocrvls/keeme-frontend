import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TiposDeAcc from './pages/modules/discente/TiposDeAcc';
import Home from './pages/modules/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/discente/tipos-de-acc" component={TiposDeAcc} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes;