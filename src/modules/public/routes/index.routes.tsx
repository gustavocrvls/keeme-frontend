import { Route } from 'react-router-dom';

import { About } from '../pages/About';
import { CreateProfile } from '../pages/CreateProfile';
import { Login } from '../pages/Login';

const Routes = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Route path="/create-profile" component={CreateProfile} />
    </>
  );
};

export default Routes;
