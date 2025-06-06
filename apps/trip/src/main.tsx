import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

import './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
