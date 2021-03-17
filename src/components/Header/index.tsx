import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { logout, USER_PERFIL_KEY } from '../../services/auth';
import PERFIS from '../../constants/Perfis';
import { HeaderStyle } from './styles';

export default function Header(): JSX.Element {
  const [perfil, setPerfil] = useState('');
  const history = useHistory();

  useEffect(() => {
    const sessionPerfil = sessionStorage.getItem(USER_PERFIL_KEY);

    switch (Number(sessionPerfil)) {
      case PERFIS.ADMIN:
        setPerfil('administrador');
        break;
      case PERFIS.COORDENADOR:
        setPerfil('coordenador');
        break;
      case PERFIS.DISCENTE:
        setPerfil('discente');
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
      <div>
        <Link to={`/${perfil}/home`}>Gestor de ACCs</Link>
      </div>

      <Flex alignItems="center">
        <div style={{ marginRight: 10, fontSize: '1rem' }}>Olá!</div>
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
