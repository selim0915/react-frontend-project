import React from 'react';
import { StyledNav, StyledNavItem, StyledNavItemIink, StyledNavItemWrap } from '../styles/layout.style';

interface NavProp {
  isLoggedIn: boolean;
}

const Nav: React.FC<NavProp> = ({ isLoggedIn }) => (
  <StyledNav>
    <StyledNavItemWrap>
      <StyledNavItem>
        <StyledNavItemIink href="/board">게시판</StyledNavItemIink>
      </StyledNavItem>
      <StyledNavItem>
        <StyledNavItemIink href="/chat">채팅창</StyledNavItemIink>
      </StyledNavItem>
      {isLoggedIn && (
        <StyledNavItem>
          <StyledNavItemIink href="/admin">관리자</StyledNavItemIink>
        </StyledNavItem>
      )}
    </StyledNavItemWrap>
  </StyledNav>
);

export default Nav;
