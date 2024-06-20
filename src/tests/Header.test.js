import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header.js';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header userData={{}} />); // pass an empty object as userData prop
  });

  // it('renders the breadcrumb', () => {
  //   render(<Header user={user} />);
  //   expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
  // });

  // it('renders the user menu', () => {
  //   render(<Header user={user} />);
  //   expect(screen.getByTestId('user-menu')).toBeInTheDocument();
  // });
});