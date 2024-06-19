import React, { useState } from 'react';
import { createUser } from '../services/api';
import { useRouter } from 'next/router';

const daysOfWeek = [
  'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
];

const NewUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const router = useRouter();

  const handleDayChange = (day) => {
    setSelectedDays((prevDays) => 
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await createUser({
        name,
        fullName,
        email,
        city,
        daysOfWeek: selectedDays.join(', ')
      });
      onUserAdded(newUser);
      setName('');
      setFullName('');
      setEmail('');
      setCity('');
      setSelectedDays([]);
      router.push('/user');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.includes('duplicate key value violates unique constraint "users_email_key"')) {
          alert('Este endereço de e-mail já está em uso. Por favor, use um e-mail diferente.');
        } else {
          alert('Erro ao criar novo usuário. Por favor, tente novamente mais tarde.');
        }
      } else {
        console.error('Erro ao criar novo usuário:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome de Usuário:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Nome Completo:
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Cidade:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <fieldset>
        <legend>Dias da Semana</legend>
        {daysOfWeek.map((day) => (
          <label key={day}
          required
          >
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleDayChange(day)}
            />
            {day}
          </label>
        ))}
      </fieldset>
      <button type="submit">Adicionar Usuário</button>
    </form>
  );
};

export default NewUserForm;
