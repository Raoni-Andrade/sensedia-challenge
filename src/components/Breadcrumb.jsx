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
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M12.2465 2.46692C11.2821 2.28137 9.81421 2.15049 8.71326 2.25652C11.4121 2.97553 13.9942 4.31248 15.9492 6.3585C19.8198 10.4108 19.754 15.8779 14.6607 18.2983C14.2312 18.5021 14.1456 18.7208 14.4928 19.0919C16.3639 21.2903 20.1884 22.064 23.6015 21.0087C25.9762 20.2731 28.8364 18.1111 29.3334 16.0071C29.3334 15.9276 29.3317 15.8481 29.3268 15.7685C29.205 13.6662 27.4112 11.6069 26.0075 10.1672C24.3174 8.43599 19.731 3.9099 12.2465 2.46692Z" fill="#8556AA"/>
<path d="M18.7172 22.6852C9.57886 21.943 11.9568 12.9124 11.9568 12.9124C13.7852 12.8362 16.512 14.0207 17.6739 14.5707C18.6234 12.0128 17.7479 8.9065 15.314 6.3585C13.3853 4.33899 10.8444 3.01198 8.18499 2.28634C2.152 3.03186 2.22606 15.911 2.22606 15.911C2.21618 30.2746 8.53881 29.7875 9.39784 29.7775C18.7172 29.6682 29.3334 20.515 29.3317 16.0038C29.3317 16.0038 26.8204 23.3429 18.7172 22.6852Z" fill="#8556AA"/>
      </svg>

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
