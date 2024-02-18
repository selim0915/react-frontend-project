import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/global.style';

const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
