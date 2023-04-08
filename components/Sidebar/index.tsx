import { ReactNode, useEffect } from 'react';
import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import { FiInfo, FiMessageSquare } from 'react-icons/fi';
import { modules } from './modules';
import { USER_PROFILE_KEY } from '../../services/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Sidebar(): JSX.Element {
  const {
    isSidebarAwaysShowed,
    isSidebarOpen,
    sidebarRef,
    toggleSidebarOpen,
  } = useSidebar();
  const router = useRouter();

  function handlePerfilItems(): ReactNode {
    const idPerfil = Number(sessionStorage.getItem(USER_PROFILE_KEY));

    return modules[idPerfil].items.map(item => (
      <ListItem key={`sidebar-item-${item.label}`}>
        <Link style={{ padding: 0 }} href={item.to}>
          <Box
            padding="3"
            fontSize="1"
            display="flex"
            alignItems="center"
            transition="padding 0.2s"
            backgroundColor={
              router.pathname.includes(item.to) ? 'gray.200' : 'white'
            }
            borderLeft={
              router.pathname.includes(item.to) ? '5px solid #31878c' : 'none'
            }
            _hover={{
              backgroundColor: '#31878c',
              color: 'white',
              paddingLeft: '4',
            }}
          >
            <item.icon />
            <span style={{ paddingLeft: 5 }}>{item.label}</span>
          </Box>
        </Link>
      </ListItem>
    ));
  }

  return (
    <Box
      className="sidenav"
      height="calc(100% - 55px)"
      width="250px"
      position="fixed"
      zIndex="10"
      top={!isSidebarAwaysShowed ? '60px' : '52px'}
      left={isSidebarAwaysShowed || isSidebarOpen ? 0 : -250}
      backgroundColor="white"
      boxShadow="md"
      transition="all 0.5s"
      overflowY="auto"
      ref={sidebarRef}
    >
      <UnorderedList itemType="none" margin="0">
        {handlePerfilItems()}

        <ListItem position="absolute" bottom="0" width="250px">
          <Link style={{ padding: 0 }} href="/about">
            <Box
              padding="3"
              fontSize="1"
              display="flex"
              alignItems="center"
              transition="padding 0.2s"
              _hover={{
                backgroundColor: 'teal',
                color: 'white',
                paddingLeft: '4',
              }}
            >
              <FiInfo />
              <span style={{ paddingLeft: 5 }}>Sobre</span>
            </Box>
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
}
