import { PrivateRoute } from '../../../routes';

import { Dashboard } from '../pages/Dashboard';
import { RegisterCoordinator } from '../pages/RegisterCoordinator';
import { EditCoordinator } from '../pages/EditCoordinator';
import { ACCTypes } from '../pages/ACCTypes';
import { RegisterACCType } from '../pages/RegisterACCType';
import { EditACCType } from '../pages/EditACCType';

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
