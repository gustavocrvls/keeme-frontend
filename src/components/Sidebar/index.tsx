import React, { useRef, useState } from 'react';
import { FiList } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ConstPerfis from '../../constants/ConstPerfis';
import { USER_PERFIL_KEY } from '../../services/auth';
import SidebarItems from './sidebarItems';
import { SidebarItem } from './styles';
import './styles.scss';

export default function Sidebar(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  function toggleSidebar(): void {
    if (sidebarOpen) {
      document.getElementById('mySidenav')?.setAttribute('style', 'left: 0px');
    } else {
      document
        .getElementById('mySidenav')
        ?.setAttribute('style', 'left: -250px');
    }
    setSidebarOpen(!sidebarOpen);
  }

  const handlePerfilItems = (): any => {
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
  };

  return (
    <>
      {window.innerWidth < 570 && (
        <button
          type="button"
          id="widgets-aside-open"
          className="widgets-aside-open"
          onClick={() => toggleSidebar()}
        >
          <FiList />
        </button>
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
