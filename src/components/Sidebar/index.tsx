import { Button } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FiList } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { USER_PERFIL_KEY } from '../../services/auth';
import SidebarItems from './sidebarItems';
import { SidebarItem } from './styles';
import './styles.scss';

export default function Sidebar(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth < 750) {
        document
          .getElementById('mySidenav')
          ?.setAttribute('style', 'left: -250px');
      } else {
        document
          .getElementById('mySidenav')
          ?.setAttribute('style', 'left: 0px');
      }
    });
    setWindowWidth(window.innerWidth);
  }, []);

  function toggleSidebar(): void {
    if (isSidebarOpen) {
      document.getElementById('mySidenav')?.setAttribute('style', 'left: 0px');
    } else {
      document
        .getElementById('mySidenav')
        ?.setAttribute('style', 'left: -250px');
    }
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handlePerfilItems(): any {
    const idPerfil = Number(sessionStorage.getItem(USER_PERFIL_KEY));

    return SidebarItems[idPerfil].items.map(item => (
      <li key={`sidebar-item-${item.label}`}>
        <Link style={{ padding: 0 }} to={item.to}>
          <SidebarItem>
            <item.icon />
            <span style={{ paddingLeft: 5 }}>{item.label}</span>
          </SidebarItem>
        </Link>
      </li>
    ));
  }

  return (
    <>
      {windowWidth < 750 && (
        <Button
          type="button"
          id="widgets-aside-open"
          className="widgets-aside-open"
          onClick={toggleSidebar}
        >
          <FiList />
        </Button>
      )}
      <div id="mySidenav" className="sidenav" ref={sidebarRef}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {handlePerfilItems()}

          <SidebarItem style={{ position: 'absolute', bottom: 0 }}>
            Sobre
          </SidebarItem>
        </ul>
      </div>
    </>
  );
}
