import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import { logout } from '../services/auth';

class Header extends React.Component<RouteComponentProps> {
  handleLogout = () => {
    const { history } = this.props;

    if (history) history.push('/');
    logout();
  };

  render() {
    return (
      <header>
        <div className="header-title">
          <Link to="/">Gestor de ACCs</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 10, fontSize: '1rem' }}>Olá!</div>
          <button
            type="button"
            onClick={this.handleLogout}
            style={{
              border: 'none',
              background: 'transparent',
              margin: 0,
              padding: 0,
            }}
          >
            <div className="header-avatar">
              <FiUser />
            </div>
          </button>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
