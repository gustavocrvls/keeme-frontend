import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import StudentRoutes from './modules/student/routes/index.routes';
import CoordinatorRoutes from './modules/coordinator/routes/index.routes';
import AdministratorRoutes from './modules/administrator/routes/index.routes';
import PublicRoutes from './modules/public/routes/index.routes';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/student" component={StudentRoutes} />
        <Route path="/coordinator" component={CoordinatorRoutes} />
        <Route path="/administrator" component={AdministratorRoutes} />
        <Route path="/" component={PublicRoutes} />

        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
