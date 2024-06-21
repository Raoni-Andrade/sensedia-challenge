import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import '../css/DropdownUserMenu.css';
import '../css/global.css';

const DropdownUserMenu = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('keydown', handleEsc);    
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };

  }, []);

  const toggleMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    closeMenu();
  };


  return (
    <div className="dropdown" ref={dropdownRef} onMouseLeave={closeMenu}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="url(#paint0_linear_794_874)"/>
<path d="M16.5967 14.0469H18.3057V20.6982C18.3057 21.4548 18.1416 22.0882 17.8135 22.5986C17.4854 23.109 17.0387 23.4941 16.4736 23.7539C15.9131 24.0091 15.2865 24.1367 14.5938 24.1367C13.8783 24.1367 13.2402 24.0091 12.6797 23.7539C12.1191 23.4941 11.6771 23.109 11.3535 22.5986C11.0345 22.0882 10.875 21.4548 10.875 20.6982V14.0469H12.584V20.6982C12.584 21.1768 12.666 21.571 12.8301 21.8809C12.9941 22.1862 13.2266 22.4118 13.5273 22.5576C13.8281 22.7035 14.1836 22.7764 14.5938 22.7764C15.0039 22.7764 15.3571 22.7035 15.6533 22.5576C15.9541 22.4118 16.1865 22.1862 16.3506 21.8809C16.5146 21.571 16.5967 21.1768 16.5967 20.6982V14.0469ZM28.0674 14.0469V24H26.3516L21.8877 16.8701V24H20.1719V14.0469H21.8877L26.3652 21.1904V14.0469H28.0674Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_794_874" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
<stop stopColor="#9946C8"/>
<stop offset="1" stopColor="#8834B9"/>
</linearGradient>
</defs>
        </svg>
      <button 
        className="dropdown-toggle" 
        onClick={toggleMenu} 
        onKeyDown={handleKeyDown} 
        onMouseEnter={handleMouseEnter}
      >


        <span className="username">{userData?.username || 'Nome de usuário'}</span>
      </button>
      {isOpen && (
        <ul 
          className="dropdown-menu" 
          onMouseLeave={handleMouseLeave}
        >
          <li className="drop-option">
            <Link href="/user">
              Lista de Amigos
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/user">
              Artigos salvos
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/user">
              Notificações
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/user">
              Preferências
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/user">
              Fechar Sessão
            </Link>
          </li>
        </ul>
        )}
    </div>
  );
};

export default DropdownUserMenu;
