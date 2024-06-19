import { useEffect, useRef, useState } from 'react';
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef} onMouseLeave={closeMenu}>
      <button className="dropdown-toggle" onClick={toggleMenu} onKeyDown={handleKeyDown} onMouseEnter={() => setIsOpen(true)}>
        <span className="username">{userData?.username || 'Usuário'}</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu" onMouseEnter={() => setIsOpen(true)} onMouseLeave={closeMenu}>
          <li>
            <Link href="/#">
              Lista de Amigos
            </Link>
          </li>
          <li>
            <Link href="/#">
              Artigos salvos
            </Link>
          </li>
          <li>
            <Link href="/#">
              Notificações
            </Link>
          </li>
          <li>
            <Link href="/#">
              Preferências
            </Link>
          </li><li>
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
