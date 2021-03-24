import React, { ReactNode, useContext } from 'react';
import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiInfo, FiMessageSquare } from 'react-icons/fi';
import { SidebarItems } from './sidebarItems';
import { USER_PERFIL_KEY } from '../../services/auth';
import { SidebarContext } from '../../contexts/SidebarProvider';

export function Sidebar(): JSX.Element {
  const { isSidebarAwaysShowed, isSidebarOpen } = useContext(SidebarContext);

  function handlePerfilItems(): ReactNode {
    const idPerfil = Number(sessionStorage.getItem(USER_PERFIL_KEY));

    return SidebarItems[idPerfil].items.map(item => (
      <ListItem key={`sidebar-item-${item.label}`}>
        <Link style={{ padding: 0 }} to={item.to}>
          <Box
            padding="3"
            fontSize="1"
            display="flex"
            alignItems="center"
            transition="padding 0.2s"
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
      top={!isSidebarAwaysShowed && isSidebarOpen ? '60px' : '52px'}
      left={isSidebarAwaysShowed || isSidebarOpen ? 0 : -250}
      backgroundColor="white"
      boxShadow="md"
      transition="all 0.5s"
      overflowY="auto"
    >
      <UnorderedList itemType="none" margin="0">
        {handlePerfilItems()}

        <ListItem position="absolute" bottom="0" width="250px">
          <Link style={{ padding: 0 }} to="/feedback">
            <Box
              padding="3"
              fontSize="1"
              display="flex"
              alignItems="center"
              transition="padding 0.2s"
              _hover={{
                backgroundColor: '#31878c',
                color: 'white',
                paddingLeft: '4',
              }}
            >
              <FiMessageSquare />
              <span style={{ paddingLeft: 5 }}>Feedback</span>
            </Box>
          </Link>
          <Link style={{ padding: 0 }} to="/about">
            <Box
              padding="3"
              fontSize="1"
              display="flex"
              alignItems="center"
              transition="padding 0.2s"
              _hover={{
                backgroundColor: '#31878c',
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
