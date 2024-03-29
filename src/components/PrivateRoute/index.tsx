import { Redirect, Route } from 'react-router-dom';

import { Container } from '../Container';
import Header from '../Header';
import { Sidebar } from '../Sidebar';
import { isAuthenticated } from '../../services/auth';
import { notifyError } from '../Notifications';
import { PrivateRouteProps } from './dtos';

export function PrivateRoute({
  component: Component,
  exact = false,
  path,
}: PrivateRouteProps): JSX.Element {
  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => {
        if (isAuthenticated())
          return (
            <>
              <Sidebar />
              <Header />
              <Container>
                <Component {...routeProps} />
              </Container>
            </>
          );
        return (
          <>
            {notifyError('Você precisa fazer login no sistema!')}
            <Redirect to={{ pathname: '/' }} />
          </>
        );
      }}
    />
  );
}
