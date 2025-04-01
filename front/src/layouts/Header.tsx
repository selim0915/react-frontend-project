import React from 'react';
import { StyledA, StyledDiv, StyledHeader, StyledHeaderItemWrap, StyledHeaderLogo } from '../styles/layout.style';
import { WordKey } from '../utils/constants';

interface HeaderProp {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProp> = ({ isLoggedIn }) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <StyledHeader>
      <StyledHeaderLogo href="/login">{WordKey.PROJECT_NAME}</StyledHeaderLogo>
      <StyledHeaderItemWrap>
        {isLoggedIn ? (
          <>
            <StyledDiv>{localStorage.getItem('id')}님</StyledDiv>
            <StyledA onClick={logout}>로그아웃</StyledA>
          </>
        ) : null}
      </StyledHeaderItemWrap>
    </StyledHeader>
  );
};

export default Header;
