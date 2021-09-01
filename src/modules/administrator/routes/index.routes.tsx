import { PrivateRoute } from '../../../components/PrivateRoute';

import { ACCTypes } from '../pages/ACCTypes';
import { Dashboard } from '../pages/Dashboard';
import { EditACCType } from '../pages/EditACCType';
import { EditCoordinator } from '../pages/EditCoordinator';
import { RegisterACCType } from '../pages/RegisterACCType';
import { RegisterCoordinator } from '../pages/RegisterCoordinator';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/administrator/home" component={Dashboard} />
      <PrivateRoute
        path="/administrator/coordinator/new"
        component={RegisterCoordinator}
      />
      <PrivateRoute
        path="/administrator/coordinator/update/:id"
        component={EditCoordinator}
      />
      <PrivateRoute
        path="/administrator/acc-types"
        exact
        component={ACCTypes}
      />
      <PrivateRoute
        path="/administrator/acc-types/new"
        component={RegisterACCType}
      />
      <PrivateRoute
        path="/administrator/acc-types/update/:id"
        component={EditACCType}
      />
    </>
  );
};

export default Routes;
