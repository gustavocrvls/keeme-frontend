import React from 'react';
import { PrivateRoute } from '../../../routes';

import { Dashboard } from '../pages/Dashboard';
import { SearchStudent } from '../pages/SearchStudent';
import { ACCDetails } from '../pages/ACCDetails';
import { StudentDetails } from '../pages/StudentDetails';

const Routes = (): JSX.Element => {
  return (
    <>
      <PrivateRoute path="/coordenador/home" component={Dashboard} />
      <PrivateRoute
        path="/coordenador/pesquisar-discente"
        component={SearchStudent}
      />
      <PrivateRoute
        path="/coordinator/student-details/:id"
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
