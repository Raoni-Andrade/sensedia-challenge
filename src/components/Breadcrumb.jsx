import React from "react";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DropdownUserMenu from './DropdownUserMenu.jsx';
import { getUserData } from '../services/api';
import '../css/Breadcrumb.css';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(segment => segment);

  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      { name: 'Bem vindo', path: '/user' },
      { name: 'Registro', path: '/users/new' }
    ];

    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      breadcrumbs.push({ name: segment, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="breadcrumb">
      <ul>
      {breadcrumbs.map((breadcrumb, index) => (
          <li key={`${breadcrumb.path}-${index}`} className={index === breadcrumbs.length - 1 ? 'active' : ''}>
            {index === breadcrumbs.length - 1 ? (
              breadcrumb.name
            ) : (
              <Link href={breadcrumb.path}>
                {breadcrumb.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
