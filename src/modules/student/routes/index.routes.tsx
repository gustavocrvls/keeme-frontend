import { PrivateRoute } from '../../../components/PrivateRoute';

import CadastrarAcc from '../pages/CadastrarACC';
import Dashboard from '../pages/Dashboard';
import DetalhesDaAcc from '../pages/DetalhesDaACC';
import DetalhesDaPontuacao from '../pages/MinhasACCs';
import TiposDeACC from '../pages/TiposDeACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/student/home" component={Dashboard} />
      <PrivateRoute path="/student/acc-types" component={TiposDeACC} />
      <PrivateRoute path="/student/new-acc" component={CadastrarAcc} />
      <PrivateRoute
        path="/student/accs"
        exact
        component={DetalhesDaPontuacao}
      />
      <PrivateRoute path="/student/accs/:id" component={DetalhesDaAcc} />
    </>
  );
};

export default Routes;
