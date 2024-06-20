import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/api';
import '../../css/UserProfile.css';
import Breadcrumb from '../../components/Breadcrumb';
import React from "react";

const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await getUserByUsername(username);
          console.log('userData:', userData);
            if (userData) {
            setUser(userData);
          } else {
            setError('Usuário não encontrado');
          } 
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          setError('Ocorreu um erro ao buscar o usuário');
        } finally {
          setIsLoading(false);
        }
      };

      if (username) {
        fetchUser();
      }
  }, [username]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  return (
    <div className="profile-container">
      <Breadcrumb />
      <h1>Perfil do Usuário: {user.name}</h1>
      <div className="profile-info">
      <p><label>Username:</label> <span>{user.name}</span></p>
      <p><label>Email:</label> <span>{user.email}</span></p>
      <p><label>Criado em:</label> <span>{user.created_at}</span></p>
      <p><label>User ID:</label> <span>{user.id}</span></p>
      <p><label>Dias da Semana:</label> <span>{user.daysOfWeek ? user.daysOfWeek.join(', ') : 'Nenhum'}</span></p>
      </div>
    </div>
  );
};

export default UserProfile;
