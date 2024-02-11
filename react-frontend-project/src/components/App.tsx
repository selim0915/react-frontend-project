import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './layout/Content';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Nav from './layout/Nav';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        {isLoggedIn && <Nav isLoggedIn={isLoggedIn} />}
        <Content isLoggedIn={isLoggedIn} />
        {isLoggedIn && <Footer />}
      </Router>
    </>
  );
};

export default App;
