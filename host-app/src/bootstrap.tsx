import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HostStoreWrapper from './components/HostStoreWrapper';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <HostStoreWrapper>
        <App />
      </HostStoreWrapper>
    </Suspense>
  </React.StrictMode>
);
