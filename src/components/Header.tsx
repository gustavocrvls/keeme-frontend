import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
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
          <Tooltip label="Sair" aria-label="A tooltip">
            <IconButton
              type="button"
              onClick={this.handleLogout}
              size="sm"
              colorScheme="gray"
              color="teal.900"
              aria-label="User Icon"
              icon={<FiLogOut size="18" />}
            />
          </Tooltip>
        </Flex>
      </HeaderStyle>
    );
  }
}

export default withRouter(Header);
