import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const _onClick = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <Link to='/'>
        <h1>Header</h1>
      </Link>
      <span onClick={_onClick}>로그아웃</span>
    </>
  );
};

export default Header;
