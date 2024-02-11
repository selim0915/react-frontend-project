import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Board from './board/Board';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {isLoggedIn ? <Header /> : null}
      <Routes>
        {!isLoggedIn ? (
          <Route path='/' element={<Login />} />
        ) : (
          <>
            <Route path='/' element={<Main />} />
            <Route path='/board/*' element={<Board />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
