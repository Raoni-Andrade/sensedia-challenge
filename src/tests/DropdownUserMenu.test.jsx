import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropdownUserMenu from '../components/DropdownUserMenu';

describe('DropdownUserMenu', () => {
  it('should render the username correctly', () => {
    const userData = { username: 'Raoni' };
    const { getByText } = render(<DropdownUserMenu userData={userData} />);
    const usernameElement = getByText('Raoni');
    expect(usernameElement).toBeInTheDocument();
  });

  it('should open the dropdown menu on button click', () => {
    const userData = { username: 'Raoni' };
    const { getByText, getByRole } = render(<DropdownUserMenu userData={userData} />);
    const button = getByRole('button');
    fireEvent.click(button);
    const dropdownMenu = getByText('Lista de Amigos');
    expect(dropdownMenu).toBeInTheDocument();
  });

  it('should close the dropdown menu on mouse leave', () => {
    const userData = { username: 'Raoni' };
    const { getByText, getByRole, queryByText } = render(<DropdownUserMenu userData={userData} />);
    const button = getByRole('button');
    fireEvent.click(button);
    const dropdownMenu = getByText('Lista de Amigos');
    fireEvent.mouseLeave(dropdownMenu);
    expect(queryByText('Lista de Amigos')).not.toBeInTheDocument();
  });

  it('should close the dropdown menu on outside click', () => {
    const userData = { username: 'Raoni' };
    const { getByRole, getByText, queryByText } = render(<DropdownUserMenu userData={userData} />);
    const button = getByRole('button');
    fireEvent.click(button);
    const dropdownMenu = getByText('Lista de Amigos');
    fireEvent.mouseDown(document);
    expect(queryByText('Lista de Amigos')).not.toBeInTheDocument();
  });

  it('should close the dropdown menu on Escape key press', () => {
    const userData = { username: 'Raoni' };
    const { getByRole, getByText, queryByText } = render(<DropdownUserMenu userData={userData} />);
    const button = getByRole('button');
    fireEvent.click(button);
    const dropdownMenu = getByText('Lista de Amigos');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(queryByText('Lista de Amigos')).not.toBeInTheDocument();
  });
});