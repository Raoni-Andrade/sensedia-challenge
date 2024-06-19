import { useEffect, useState } from 'react';
import UsersTable from '../../components/UsersTable';
// import Breadcrumb from '../../components/Breadcrumb';
import React from "react";
import Header from '../../components/Header';
import { getUsers } from '../../services/api';


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getUsers();
      setUsers(userData);
      // Defina o usuário atual, substitua com a lógica real de seleção do usuário atual
      setCurrentUser(userData[0]); 
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header user={currentUser} />
      <h1>Usuários</h1>
      <UsersTable users={users} setUsers={setUsers}/>
    </div>
  );
};

export default UsersPage;
