import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../components/Breadcrumb';

describe('generateBreadcrumbs', () => {
  it('should generate the correct breadcrumbs', () => {
    const { container } = render(<Breadcrumb />);
    const breadcrumbList = container.querySelector('ul');
    const breadcrumbs = breadcrumbList.querySelectorAll('li');

    expect(breadcrumbs.length).toBe(2); // Update the expected length based on the number of breadcrumbs you expect

    // Add more assertions to validate the content and paths of the breadcrumbs
    expect(breadcrumbs[0].textContent).toBe('BEM-VINDO');
    expect(breadcrumbs[0].querySelector('a')).toHaveAttribute('href', '/user');
    expect(breadcrumbs[1].textContent).toBe('Registro');
  });
});