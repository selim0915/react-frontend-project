import React from 'react';
import { Link } from 'react-router-dom';
import routeConfig from '../routes/route';
import { StyledNav, StyledNavItem, StyledNavItemIink, StyledNavItemWrap } from '../styles/layout.style';
import { RouteMenuItem } from '../types/core.type';

interface NavProp {
  isLoggedIn: boolean;
}

const Nav: React.FC<NavProp> = ({ isLoggedIn }) => {
  const userRole = localStorage.getItem('role') || '';

  const menuItems: RouteMenuItem[] = routeConfig.filter((route: RouteMenuItem) => {
    if (!route.showInMenu) return false;
    if (route.authRequired && !isLoggedIn) return false;
    if (route.roles && (!userRole || !route.roles.includes(userRole))) return false;
    return true;
  });

  return (
    <StyledNav>
      <StyledNavItemWrap>
        {menuItems.map((item) => (
          <StyledNavItem key={item.path}>
            <StyledNavItemIink as={Link} to={item.path}>
              {item.label}
            </StyledNavItemIink>
          </StyledNavItem>
        ))}
      </StyledNavItemWrap>
    </StyledNav>
  )
};

export default Nav;
