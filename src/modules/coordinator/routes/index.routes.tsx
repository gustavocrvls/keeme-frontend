import { PrivateRoute } from '../../../components/PrivateRoute';

import { ACCDetails } from '../pages/ACCDetails';
import { Dashboard } from '../pages/Dashboard';
import { SearchStudent } from '../pages/SearchStudent';
import { StudentDetails } from '../pages/StudentDetails';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/coordinator/home" component={Dashboard} />
      <PrivateRoute
        path="/coordinator/search-student/"
        component={SearchStudent}
        exact
      />
      <PrivateRoute
        path="/coordinator/search-student/:id"
        component={StudentDetails}
      />
      <PrivateRoute
        path="/coordinator/acc-details/:id"
        component={ACCDetails}
      />
    </>
  );
};

export default Routes;
