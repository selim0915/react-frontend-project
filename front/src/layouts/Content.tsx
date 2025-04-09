import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../routes/route';
import { StyledContent } from '../styles/layout.style';

interface ContentProp {
  isLoggedIn: boolean;
}

const Content: React.FC<ContentProp> = ({ isLoggedIn }) => (
  <StyledContent>
    <Routes>
      {routeConfig.map((route) => {
        if (!route.authRequired || isLoggedIn) {
          return <Route key={route.path} path={route.path} element={<route.element />} />;
        }
        return null;
      })}
    </Routes>
  </StyledContent>
);

export default Content;
