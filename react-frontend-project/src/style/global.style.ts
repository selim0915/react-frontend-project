import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
  }

  body {
    font-family: sans-serif;
    margin: 0 auto;
    padding: 0;
    background-color: #e2e2e2;
  }
`;

export default GlobalStyle;
