import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppStoreProvider } from './store/AppStore';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  </React.StrictMode>
);
