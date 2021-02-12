import React, { useRef, useState } from 'react';
import { FiList } from 'react-icons/fi';
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
            <Link style={{ padding: 0 }} to="/discente/detalhes-da-pontuacao">
              <SidebarItem>teste</SidebarItem>
            </Link>
          </li>
          <SidebarItem>teste</SidebarItem>
          <SidebarItem>teste</SidebarItem>
          <SidebarItem>teste</SidebarItem>
          <SidebarItem>teste</SidebarItem>
        </ul>
      </div>
    </>
  );
}
