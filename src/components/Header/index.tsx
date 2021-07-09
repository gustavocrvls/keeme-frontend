import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiList, FiLogOut } from 'react-icons/fi';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';

import { PROFILES } from '../../constants/Profiles';
import { useSidebar } from '../../hooks/useSidebar';
import { logout, USER_NAME_KEY, USER_PROFILE_KEY } from '../../services/auth';

export default function Header(): JSX.Element {
  const [profile, setProfile] = useState('');
  const history = useHistory();

  const { isSidebarAwaysShowed, toggleSidebarOpen } = useSidebar();

  useEffect(() => {
    const sessionPerfil = sessionStorage.getItem(USER_PROFILE_KEY);

    switch (Number(sessionPerfil)) {
      case PROFILES.ADMINISTRATOR:
        setProfile('administrator');
        break;
      case PROFILES.COORDINATOR:
        setProfile('coordinator');
        break;
      case PROFILES.STUDENT:
        setProfile('student');
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
    <Flex
      as="header"
      w="100%"
      justify="space-between"
      background="teal.500"
      p="2"
      top="0"
      pos="sticky"
      zIndex="100"
      color="white"
    >
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
        <Link to={`/${profile}/home`}>KeeMe</Link>
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
    </Flex>
  );
}
