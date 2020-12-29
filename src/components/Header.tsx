import React from 'react';
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render () {
    return (
      <header>
        <div className="header-title">
          <Link to="/">Gestor de ACCs</Link>
        </div>
        <div className="header-avatar">
          <FiUser />
        </div>
      </header>
    );
  }
}