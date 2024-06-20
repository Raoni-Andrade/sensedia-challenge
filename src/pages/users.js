import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import UsersTable from '../components/UsersTable';
import { getAlbumsByUserId, getPostsByUserId, getUsers } from '../services/api';
import NewUserForm from '../components/NewUserForm';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getUsers();
      setUsers(userData);
      setCurrentUser(userData[0]); 
    };

    fetchUsers();
  }, []);

  const handleUserAdded = async (newUser) => {
    try {
      const usersAlbum = await getAlbumsByUserId(newUser.id);
      const usersPosts = await getPostsByUserId(newUser.id);
      const updatedUser = { 
        ...newUser,
        albums: usersAlbum ? usersAlbum.length : 0,
        posts: usersPosts ? usersPosts.length : 0,
      };
      setUsers((prevUsers) => [...prevUsers, updatedUser]);
    } catch (error) {
      console.error('Erro ao buscar álbuns e posts do novo usuário:', error);
    }
  }

  return (
    <div>
      <Header user={currentUser} />
      <h1>Usuários e Formulário juntos</h1>
      <UsersTable users={users} setUsers={setUsers}/>
      <h2>Formulário de Registro</h2>
      <NewUserForm onUserAdded={handleUserAdded}/>
    </div>
  );
};

export default UsersPage;
