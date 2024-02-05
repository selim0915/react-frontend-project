import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    html {
        font-size: 10px;
    }
    
    body {
        font-family: sans-serif;
        margin: 0 auto;
        padding: 0;
        background-color: aqua;
    }
`;

export default GlobalStyle;
