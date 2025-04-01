import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import GlobalStyle from './styles/global.style';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>,
  );
}
