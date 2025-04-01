import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Nav from './layouts/Nav';
import { StyledArticle, StyledMain } from './styles/layout.style';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <StyledMain>
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        {isLoggedIn && <Nav isLoggedIn={isLoggedIn} />}
        <StyledArticle>
          <Content isLoggedIn={isLoggedIn} />
          <Footer />
        </StyledArticle>
      </Router>
    </StyledMain>
  );
};

export default App;
