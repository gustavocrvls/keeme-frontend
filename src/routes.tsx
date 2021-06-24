import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import StudentRoutes from './modules/student/routes/index.routes';
import CoordinatorRoutes from './modules/coordinator/routes/index.routes';
import AdministratorRoutes from './modules/administrator/routes/index.routes';

import Login from './modules/public/Login';
import { About } from './modules/public/About';
import { Feedback } from './modules/public/Feedback';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />

        <Route path="/about" component={About} />
        <Route path="/feedback" component={Feedback} />

        <Route path="/student" component={StudentRoutes} />
        <Route path="/coordinator" component={CoordinatorRoutes} />
        <Route path="/administrator" component={AdministratorRoutes} />

        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
