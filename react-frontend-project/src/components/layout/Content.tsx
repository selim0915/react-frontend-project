import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../../constants/route';
import { StyledArticle } from '../../styles/layout.style';

interface ContentProp {
  isLoggedIn: boolean;
}

const Content: React.FC<ContentProp> = ({ isLoggedIn }) => {
  return (
    <StyledArticle>
      <Routes>
        {routeConfig.map((route) => {
          if (!route.authRequired || isLoggedIn) {
            return <Route key={route.path} path={route.path} element={<route.element />} />;
          }
          return null;
        })}
      </Routes>
    </StyledArticle>
  );
};

export default Content;
