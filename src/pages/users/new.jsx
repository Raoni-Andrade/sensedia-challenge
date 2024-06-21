import React from 'react';
import Header from '../../components/Header';
import NewUserForm from '../../components/NewUserForm';
import { getAlbumsByUserId, getPostsByUserId } from '../../services/api';

const NewUserPage = ({ setUsers }) => {

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
      <Header />
      <NewUserForm onUserAdded={handleUserAdded}/>
    </div>
  );
};

export default NewUserPage;
