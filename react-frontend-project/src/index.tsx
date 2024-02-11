import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import GlobalStyle from './style/global.style';

const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
