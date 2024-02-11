import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
  }

  body {
    margin: 0 auto;
    padding: 0;
    font-size: 12px;
    text-align: center;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
