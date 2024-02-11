import React from 'react';
import { StyledNav, StyledNavItemWrap, StyledNavItem, StyledNavItemIink } from '../../style/layout.style';

interface NavProp {
  isLoggedIn: boolean;
}

const Nav: React.FC<NavProp> = ({ isLoggedIn }) => {
  return (
    <StyledNav>
      {isLoggedIn ? (
        <StyledNavItemWrap>
          <StyledNavItem>
            <StyledNavItemIink href='/board'>게시판</StyledNavItemIink>
          </StyledNavItem>
          <StyledNavItem>
            <StyledNavItemIink href='/chat'>채팅창</StyledNavItemIink>
          </StyledNavItem>
        </StyledNavItemWrap>
      ) : null}
    </StyledNav>
  );
};

export default Nav;
