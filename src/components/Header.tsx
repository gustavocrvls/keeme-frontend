import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import { Box, Button, Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import { logout } from '../services/auth';

const HeaderStyle = styled.header`
  box-sizing: border-box;
  width: 100%;

  position: sticky;
  top: 0;

  background: #31878c;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;

  z-index: 100;
`;

class Header extends React.Component<RouteComponentProps> {
  handleLogout = () => {
    const { history } = this.props;

    if (history) history.push('/');
    logout();
  };

  render() {
    return (
      <HeaderStyle>
        <div>
          <Link to="/home">Gestor de ACCs</Link>
        </div>

        <Flex alignItems="center">
          <div style={{ marginRight: 10, fontSize: '1rem' }}>Olá!</div>
          <Button
            type="button"
            onClick={this.handleLogout}
            border="none"
            background="transparent"
            margin="0"
            padding="0"
          >
            <div className="header-avatar">
              <FiUser />
            </div>
          </Button>
        </Flex>
      </HeaderStyle>
    );
  }
}

export default withRouter(Header);
