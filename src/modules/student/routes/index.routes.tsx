import { PrivateRoute } from '../../../components/PrivateRoute';

import { NewAcc } from '../pages/NewACC';
import Dashboard from '../pages/Dashboard';
import { ACCDetails } from '../pages/ACCDetails';
import DetalhesDaPontuacao from '../pages/MyACCs';
import TiposDeACC from '../pages/TiposDeACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/student/home" component={Dashboard} />
      <PrivateRoute path="/student/acc-types" component={TiposDeACC} />
      <PrivateRoute path="/student/new-acc" component={NewAcc} />
      <PrivateRoute
        path="/student/accs"
        exact
        component={DetalhesDaPontuacao}
      />
      <PrivateRoute path="/student/accs/:id" component={ACCDetails} />
    </>
  );
};

export default Routes;
