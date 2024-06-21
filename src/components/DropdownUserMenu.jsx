import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import '../css/DropdownUserMenu.css'; 

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
            <Link href="/#">
              Lista de Amigos
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/#">
              Artigos salvos
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/#">
              Notificações
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/#">
              Preferências
            </Link>
          </li>
          <li className="drop-option">
            <Link href="/#">
              Fechar Sessão
            </Link>
          </li>
        </ul>
        )}
    </div>
  );
};

export default DropdownUserMenu;
