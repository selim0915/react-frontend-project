import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <Link to='/'>
        <h1>Header</h1>
      </Link>
    </>
  );
};

export default Header;
