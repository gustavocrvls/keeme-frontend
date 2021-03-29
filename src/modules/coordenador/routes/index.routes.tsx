import React from 'react';
import { PrivateRoute } from '../../../routes';

import { Dashboard } from '../pages/Dashboard';
import { SearchStudent } from '../pages/SearchStudent';
import { ACCDetails } from '../pages/ACCDetails';
import DetalhesDoDiscente from '../pages/DetalhesDoDiscente';

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
        component={DetalhesDoDiscente}
      />
      <PrivateRoute
        path="/coordinator/acc-details/:id"
        component={ACCDetails}
      />
    </>
  );
};

export default Routes;
