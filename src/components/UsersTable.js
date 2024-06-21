import React, { useEffect, useState } from 'react';
import { getUsers, getAlbumsByUserId, getPostsByUserId, deleteUser } from '../services/api';
import Link from 'next/link';
import '../css/global.css';
import '../css/UsersTable.css';

const UsersTable = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [userToRemove, setUserToRemove] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(5);
  const usersPerPage = 5;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        if (userData) {
          const updatedUsers = await Promise.all(userData.map(async (user) => {
            const usersAlbum = await getAlbumsByUserId(user.id);
            const usersPosts = await getPostsByUserId(user.id);
            const randomDaysOfWeek = generateRandomDaysOfWeek();
            const randomCities = generateRandomCities();
            return { 
              ...user,
              albums: usersAlbum ? usersAlbum.length : 0,
              posts: usersPosts ? usersPosts.length : 0,
              daysOfWeek: randomDaysOfWeek,
              city: randomCities
            };
          }))
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const generateRandomDaysOfWeek = () => {
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const randomDays = [];
    const daysCount = Math.floor(Math.random() * days.length) + 1;
    while (randomDays.length < daysCount) {
      const randomIndex = Math.floor(Math.random() * days.length);
      if (!randomDays.includes(days[randomIndex])) {
        randomDays.push(days[randomIndex]);
      }
    }
    return randomDays.join(', ');
  };

  const generateRandomCities = () => {
    const cities = ['Nova York', 'Antuérpia', 'Belo Horizonte', 'Rio de Janeiro', 'Manaus', 'Paris', 'Breda', 'Bucareste', 'Dubrovnik'];
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log(`Usuário com ID ${userToRemove.id} foi deletado`);
      setShowConfirmation(false);
      deleteUser(userToRemove.id)
      setUserToRemove(null);
      return setUsers(users.filter(user => user.id !== userToRemove.id));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleMouseEnter = (userId) => {
    setHoveredUser(userId);
  }

  const handleMouseLeave = () => {
    setHoveredUser(null);
  }

  const openDeleteConfirmation = (userId) => {
    const userToDelete = users.find(user => user.id === userId);
    setUserToRemove(userToDelete);
    setShowConfirmation(true);
  }

  const closeDeleteConfirmation = () => {
    setUserToRemove(null);
    setShowConfirmation(false);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const filteredUsers = users.filter(user => {
    const searchTerm = searchText.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchTerm) ||
      user.username?.toLowerCase().includes(searchTerm) ||
      user.id.toString().toLowerCase().includes(searchTerm) 
    );
  });

  // const getPagesToShow = (currentPage, totalPages) => {
  //   let pagesToShow = [];

  //   // Always show the first page
  //   if (currentPage > 3) {
  //     pagesToShow.push(1);
  //   }

  //   // Show pages around the current page
  //   for (let i = currentPage - 1; i <= currentPage + 1; i++) {
  //     if (i > 1 && i < totalPages) {
  //       pagesToShow.push(i);
  //     }
  //   }

  //   // Always show the last page
  //   if (currentPage < totalPages - 2) {
  //     pagesToShow.push(totalPages);
  //   }

  //   return pagesToShow;
  // };

  const getPagesToShow = (currentPage, totalPages) => {
    let pagesToShow = [];
  
    // Adicionar a página anterior, se existir
    if (currentPage > 1) {
      pagesToShow.push(currentPage - 1);
    }
  
    // Adicionar a primeira página
    pagesToShow.push(1);
  
    // Adicionar a página atual
    pagesToShow.push(currentPage);
  
    // Adicionar a última página
    pagesToShow.push(totalPages);
  
    // Adicionar a próxima página, se existir
    if (currentPage < totalPages) {
      pagesToShow.push(currentPage + 1);
    }
  
    // Remover duplicatas e ordenar as páginas
    pagesToShow = Array.from(new Set(pagesToShow)).sort((a, b) => a - b);
  
    return pagesToShow;
  };

  const pagesToShow = getPagesToShow(currentPage, totalPages);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="main-container">
      <h1 className="title">Usuários</h1>
      {isLoading ? (
        <p>Carregando tabela...</p>
      ) : (
        <div>
        {showConfirmation && (
          <div className="modal">
            <div className="modal-content">
              <h3>Confirmar Remoção</h3>
              <p>Deseja realmente remover o usuário?</p>
              <div className="modal-buttons">
                <button onClick={handleDeleteUser}>Confirmar</button>
                <button onClick={closeDeleteConfirmation}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
          <div className="search-bar">
            <input
              className='input-search'
              type="text"
              placeholder="Procurar"
              value={searchText}
              onChange={handleSearchChange}
            />
            <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#919191"/>
            </svg>

          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cidade</th>
                <th>Dias da semana</th>
                <th>Posts</th>
                <th>Albuns</th>
                <th>🗑️</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr
                  key={user.id}
                  onMouseEnter={() => handleMouseEnter(user.id)}
                  onMouseLeave={handleMouseLeave}
                 >
                  <td>{user.id}</td>
                  <td>
                  <Link href={`/user/${user.name}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.city}</td>
                  <td>{user.daysOfWeek}</td>
                  <td>{user.posts}</td>
                  <td>{user.albums}</td>
                  <td>
                    {hoveredUser === user.id && (
                    <span
                      className="delete-icon"
                      onClick={() => openDeleteConfirmation(user.id)}
                    >
                      🗑️
                    </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
          {/* {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))} */}

          <button
            onClick={() => handlePageChange(currentPage === 1 ? currentPage : currentPage - 1)}
              // disabled={currentPage === 1}
          >
              Anterior
            </button>

            {/* Adicionar '...' se houver mais de duas páginas antes da página atual */}
            {currentPage > 3 && <span>...</span>}
            {/* Mostrar páginas antes da página atual */}
            {pagesToShow.map((page, index) => (
              (page !== 1 && page !== totalPages && currentPage > 3 && index === 0) ?
              <span key="start-page" className="ellipsis">...</span> : 
              <button 
                key={index}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? 'current-page' : ''}
                disabled={currentPage === index + 1}
              >
                {page}
              </button>
            ))}
            {/* Adicionar '...' se houver mais de duas páginas depois da página atual */}
            {currentPage < totalPages - 2 && <span>...</span>}
            {/* Adicionar página final, se não estiver presente */}
            {!pagesToShow.includes(totalPages - 1) && (
              <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próximo
            </button>
            <span>Ir para a página:</span>
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
