import React from 'react';
import { StyledHeader, StyledHeaderLogo, StyledHeaderItem, StyledHeaderItemWrap } from '../../style/layout.style';
import { sampeople } from '../../utils/image.import';

interface HeaderProp {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProp> = ({ isLoggedIn }) => {
  const logo = () => {
    window.location.href = '/';
  };

  const login = () => {
    window.location.href = '/login';
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <StyledHeader>
      <StyledHeaderLogo src={sampeople} alt='logo' onClick={logo} />
      <StyledHeaderItemWrap>
        {isLoggedIn ? (
          <>
            <StyledHeaderItem>{localStorage.getItem('id')}님</StyledHeaderItem>
            <StyledHeaderItem className='event' onClick={logout}>
              로그아웃
            </StyledHeaderItem>
          </>
        ) : (
          <StyledHeaderItem className='event' onClick={login}>
            로그인
          </StyledHeaderItem>
        )}
      </StyledHeaderItemWrap>
    </StyledHeader>
  );
};

export default Header;
