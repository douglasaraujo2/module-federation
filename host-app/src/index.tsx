import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Lazy load the StoreWrapper from remote
const StoreWrapper = lazy(() => import('remote/StoreWrapper'));

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <StoreWrapper>
        <App />
      </StoreWrapper>
    </Suspense>
  </React.StrictMode>
);
