import styled from 'styled-components';

const StyledHeader = styled.header`
  width: auto;
  height: 30px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid lightgray;
`;

const StyledHeaderLogo = styled.img`
  width: 150px;
  height: 20px;
  cursor: pointer;
`;

const StyledHeaderItemWrap = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledHeaderItem = styled.span`
  &.event:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledNav = styled.nav`
  width: auto;
  height: 20px;
  padding: 20px;
  background-color: #3aa4d2;
`;

const StyledNavItemWrap = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
`;

const StyledNavItem = styled.li`
  min-width: 50px;
`;

const StyledNavItemIink = styled.a`
  font-size: 14px;
  color: white;
  text-decoration: none;
  &:hover {
    font-weight: bold;
  }
`;

const StyledArticle = styled.article`
  width: auto;
  min-height: 500px;
  padding: 20px;
  background-color: white;
`;

const StyledFooter = styled.footer`
  width: auto;
  height: 60px;
  border-top: 1px solid lightgray;
  font-size: 12px;
  color: gray;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  StyledHeader,
  StyledHeaderLogo,
  StyledHeaderItemWrap,
  StyledHeaderItem,
  StyledNav,
  StyledNavItemWrap,
  StyledNavItem,
  StyledNavItemIink,
  StyledArticle,
  StyledFooter
};
