import React from 'react';
import Breadcrumb from './Breadcrumb';
import DropdownUserMenu from './DropdownUserMenu';
import '../css/Header.css';

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">Logo</div>
            <Breadcrumb />
          <div className="user-menu">
            <DropdownUserMenu user={user}/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
