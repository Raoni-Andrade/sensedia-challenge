import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link href="/user">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFoundPage;