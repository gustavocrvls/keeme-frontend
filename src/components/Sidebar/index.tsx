import React, { useRef, useState } from 'react';
import { FiFile, FiHome, FiList, FiPackage, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
          <li>
            <Link style={{ padding: 0 }} to="/home">
              <SidebarItem>
                <FiHome />
                <span style={{ paddingLeft: 5 }}>Início</span>
              </SidebarItem>
            </Link>
          </li>
          <li>
            <Link style={{ padding: 0 }} to="/discente/cadastrar-acc">
              <SidebarItem>
                <FiPlus />
                <span style={{ paddingLeft: 5 }}>Nova ACC</span>
              </SidebarItem>
            </Link>
          </li>
          <li>
            <Link style={{ padding: 0 }} to="/discente/detalhes-da-pontuacao">
              <SidebarItem>
                <FiFile />
                <span style={{ paddingLeft: 5 }}>Minhas ACCs</span>
              </SidebarItem>
            </Link>
          </li>
          <li>
            <Link style={{ padding: 0 }} to="/discente/tipos-de-acc">
              <SidebarItem>
                <FiPackage />
                <span style={{ paddingLeft: 5 }}>Tipos de ACC</span>
              </SidebarItem>
            </Link>
          </li>
          <SidebarItem style={{ position: 'absolute', bottom: 0 }}>
            Sobre
          </SidebarItem>
        </ul>
      </div>
    </>
  );
}
