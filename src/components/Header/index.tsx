import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiList, FiLogOut } from 'react-icons/fi';

import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { logout, USER_NAME_KEY, USER_PERFIL_KEY } from '../../services/auth';
import PERFIS from '../../constants/Perfis';
import { HeaderStyle } from './styles';
import { SidebarContext } from '../../contexts/SidebarProvider';

export default function Header(): JSX.Element {
  const [perfil, setPerfil] = useState('');
  const history = useHistory();

  const { isSidebarAwaysShowed, toggleSidebarOpen } = useContext(
    SidebarContext,
  );

  useEffect(() => {
    const sessionPerfil = sessionStorage.getItem(USER_PERFIL_KEY);

    switch (Number(sessionPerfil)) {
      case PERFIS.ADMIN:
        setPerfil('administrator');
        break;
      case PERFIS.COORDENADOR:
        setPerfil('coordinator');
        break;
      case PERFIS.DISCENTE:
        setPerfil('student');
        break;
      default:
        break;
    }
  }, []);

  function handleLogout(): void {
    if (history) history.push('/');
    logout();
  }

  return (
    <HeaderStyle>
      <Flex alignItems="center">
        {!isSidebarAwaysShowed && (
          <IconButton
            aria-label="sidebar"
            variant="unstyled"
            icon={<FiList size={20} />}
            display="flex"
            onClick={toggleSidebarOpen}
            size="sm"
          />
        )}
        <Link to={`/${perfil}/home`}>KeeMe</Link>
      </Flex>

      <Flex alignItems="center">
        <div style={{ marginRight: 10, fontSize: '1rem' }}>
          {`Olá, ${sessionStorage.getItem(USER_NAME_KEY)?.split(' ')[0]}!`}
        </div>
        <Tooltip label="Sair" aria-label="Sair">
          <IconButton
            type="button"
            onClick={handleLogout}
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
