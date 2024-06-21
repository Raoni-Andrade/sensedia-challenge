import React, { useState } from 'react';
import { createUser } from '../services/api';
import { useRouter } from 'next/router';
import '../css/NewUserForm.css';
import '../css/global.css';

const daysOfWeek = [
  'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'
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
    <div className="form-container">
      <h4>REGISTRO</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row leftRow">
          <div className="form-group">
            <label></label>
              <input
                type="text"
                placeholder="Nome de Usuário *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
          </div>
          <div className="form-group">
            <label></label>
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>
          <div className="form-group">
            <label></label>
              <input
                type="text"
                placeholder="Nome Completo *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />
            </div>
          </div>
        <div className="form-row rightRow">
          <div className="form-group">
            <label></label>
              <input
                type="text"
                placeholder="Cidade *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
          </div>
          <fieldset className="form-group checkbox-group">
            <legend>Dias da Semana</legend>
            <div className="checkbox-container">
              {daysOfWeek.map((day) => (
                <label key={day}
                className="checkbox-item"
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
            </div>
          </fieldset>
        </div>
      </form>
      <div className="form-buttons">
        <button type="submit">REGISTRAR</button>
        <button type="button">CANCELAR</button>
      </div>
    </div>
  );
};

export default NewUserForm;
