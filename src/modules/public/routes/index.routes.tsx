import { Route } from 'react-router-dom';

import { About } from '../pages/About';
import { Login } from '../pages/Login';

const Routes = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
    </>
  );
};

export default Routes;
