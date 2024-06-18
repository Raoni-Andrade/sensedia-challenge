import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UsersTable from '../components/UsersTable';

describe('UsersTable', () => {
  it('renders loading state initially', () => {
    render(<UsersTable />);

    const loadingElement = screen.getByText('Carregando...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders users data correctly after loading', async () => {
    // Mock data to simulate API response
    const mockUsers = [
      { id: 1, name: 'User 1', email: 'user1@example.com', daysOfWeek: 'Segunda', posts: 3, albums: 5 },
      { id: 2, name: 'User 2', email: 'user2@example.com', daysOfWeek: 'Quarta', posts: 0, albums: 2 },
    ];

    // Mock API functions
    jest.mock('../services/api', () => ({
      getUsers: jest.fn(() => Promise.resolve(mockUsers)),
      getAlbumsByUserId: jest.fn(() => Promise.resolve([])),
      getPostsByUserId: jest.fn(() => Promise.resolve([])),
    }));

    render(<UsersTable />);

    // Wait for loading to finish
    await screen.findByText('Tabela de Usuários');

    // Check if user data is rendered correctly
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('Segunda')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('displays delete confirmation modal when delete icon is clicked', async () => {
    render(<UsersTable />);

    // Wait for loading to finish
    await screen.findByText('Tabela de Usuários');

    // Find delete icon and click it
    const deleteIcon = screen.getByText('🗑️');
    fireEvent.click(deleteIcon);

    // Check if confirmation modal appears
    const confirmButton = screen.getByText('Confirmar');
    expect(confirmButton).toBeInTheDocument();
  });

  // Add more test cases as needed
});
