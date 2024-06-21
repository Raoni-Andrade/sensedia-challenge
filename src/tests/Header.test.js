import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header.js';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header userData={{}} />); 
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();

    // Check if the DropdownUserMenu component is in the document
    expect(screen.getByTestId('dropdown-user-menu')).toBeInTheDocument();
  
  });
});