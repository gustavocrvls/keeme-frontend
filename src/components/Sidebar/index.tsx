import React from 'react';
import { FiList } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { USER_PERFIL_KEY } from '../../services/auth';
import SidebarItems from './sidebarItems';
import { SidebarItem } from './styles';
import './styles.scss';

interface IProps {}

interface IState {
  isSidebarOpen: boolean;
  windowWidth: number;
}

class Sidebar extends React.Component<IProps, IState> {
  private sidebarRef = React.createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      windowWidth: 0,
    };
  }

  componentDidMount(): void {
    window.addEventListener('resize', () => {
      this.setState({
        windowWidth: window.innerWidth,
      });

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
  }

  toggleSidebar = (): void => {
    const { isSidebarOpen } = this.state;

    if (isSidebarOpen) {
      document.getElementById('mySidenav')?.setAttribute('style', 'left: 0px');
    } else {
      document
        .getElementById('mySidenav')
        ?.setAttribute('style', 'left: -250px');
    }
    this.setState({
      isSidebarOpen: !isSidebarOpen,
    });
  };

  handlePerfilItems = (): any => {
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

  render(): JSX.Element {
    const { windowWidth } = this.state;

    return (
      <>
        {windowWidth < 750 && (
          <button
            type="button"
            id="widgets-aside-open"
            className="widgets-aside-open"
            onClick={this.toggleSidebar}
          >
            <FiList />
          </button>
        )}
        <div id="mySidenav" className="sidenav" ref={this.sidebarRef}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {this.handlePerfilItems()}

            <SidebarItem style={{ position: 'absolute', bottom: 0 }}>
              Sobre
            </SidebarItem>
          </ul>
        </div>
      </>
    );
  }
}

export default Sidebar;
