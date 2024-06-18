import React, { useEffect, useState } from 'react';
import { getUsers, getAlbumsByUserId, getPostsByUserId } from '../services/api';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredUser, setHoveredUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        if (userData) {
          const updatedUsers = await Promise.all(userData.map(async (user) => {
            const usersAlbum = await getAlbumsByUserId(user.id);
            const usersPosts = await getPostsByUserId(user.id);
            const randomDaysOfWeek = generateRandomDaysOfWeek();
            return { 
              ...user,
              albums: usersAlbum ? usersAlbum.length : 0,
              posts: usersPosts ? usersPosts.length : 0,
              daysOfWeek: randomDaysOfWeek
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
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Todos', 'Fim de semana', 'Nenhum'];
    const randomIndex = Math.floor(Math.random() * days.length);
    return days[randomIndex];
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log(`Usuário com ID ${userId} foi deletado`);
      setUsers(users.filter(user => user.id !== userId));
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

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <h2>Tabela de Usuários</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Dias da semana</th>
                <th>Posts</th>
                <th>Albuns</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onMouseEnter={() => handleMouseEnter(user.id)}
                  onMouseLeave={handleMouseLeave}
                 >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.daysOfWeek}</td>
                  <td>{user.posts}</td>
                  <td>{user.albums}</td>
                  <td>
                    {hoveredUser === user.id && (
                    <span
                      className="delete-icon"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      🗑️
                    </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
