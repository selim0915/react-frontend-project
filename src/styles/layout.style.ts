import styled from 'styled-components';
import { Theme } from '../utils/constants';

// Header
export const StyledHeader = styled.header`
  width: 100%;
  height: ${Theme.headerHeight};
  padding: ${Theme.rlPadding};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid lightgray;
`;
export const StyledHeaderLogo = styled.img`
  width: 150px;
  height: 20px;
  cursor: pointer;
`;
export const StyledHeaderItemWrap = styled.div`
  display: flex;
  gap: 20px;
`;
export const StyledHeaderItem = styled.span`
  &.event:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

// Nav
export const StyledNav = styled.nav`
  width: auto;
  height: ${Theme.navHeight};
  padding: 0px ${Theme.rlPadding};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  background-color: ${Theme.mainColor};
`;
export const StyledNavItemWrap = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  gap: 20px;
`;
export const StyledNavItem = styled.li`
  margin: 0;
  padding: 0;
  min-width: 50px;
`;
export const StyledNavItemIink = styled.a`
  font-size: 14px;
  color: white;
  text-decoration: none;
  &:hover {
    font-weight: bold;
  }
`;

// Content
export const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const StyledArticle = styled.article`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-anchor: none;
`;
export const StyledContent = styled.section`
  width: 100%;
  min-height: calc(100% - ${Theme.footerHeight});
  padding: 24px ${Theme.rlPadding};
  box-sizing: border-box;
`;

// Footer
export const StyledFooter = styled.footer`
  width: auto;
  height: ${Theme.footerHeight};
  border-top: 1px solid lightgray;
  box-sizing: border-box;
  font-size: 12px;
  color: gray;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
