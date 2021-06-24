import { Redirect, Route } from 'react-router-dom';

import { Container } from '../Containers';
import Header from '../Header';
import { Sidebar } from '../Sidebar';

import { isAuthenticated } from '../../services/auth';
import { notifyError } from '../Notifications';

interface PrivateRouteProps {
  path: string;
  component: React.ElementType;
  exact?: boolean;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { component: Component, exact, path } = props;
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

PrivateRoute.defaultProps = {
  exact: false,
};
