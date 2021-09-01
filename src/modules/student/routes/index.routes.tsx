import { PrivateRoute } from '../../../components/PrivateRoute';

import { ACCDetails } from '../pages/ACCDetails';
import { ACCTypes } from '../pages/ACCTypes';
import { Dashboard } from '../pages/Dashboard';
import { MyACCs } from '../pages/MyACCs';
import { NewAcc } from '../pages/NewACC';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/student/home" component={Dashboard} />
      <PrivateRoute path="/student/acc-types" component={ACCTypes} />
      <PrivateRoute path="/student/new-acc" component={NewAcc} />
      <PrivateRoute path="/student/accs" exact component={MyACCs} />
      <PrivateRoute path="/student/accs/:id" component={ACCDetails} />
    </>
  );
};

export default Routes;
