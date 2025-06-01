/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store/store';
import GlobalStyle from './styles/global.style';
import { NewsStore } from './types';

const NewsStoreContext = createContext<NewsStore | undefined>(undefined);

export const useNewsStore = () => {
  const context = useContext(NewsStoreContext);
  if (!context) {
    throw new Error('useNewsStore must be used within a NewsStoreProvider');
  }
  return context;
};

const store = new Store();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <NewsStoreContext.Provider value={store}>
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>
    </NewsStoreContext.Provider>
  );
}
