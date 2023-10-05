import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LogsContextProvider } from './context/LogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <LogsContextProvider>
    <App />
  </LogsContextProvider>
  </React.StrictMode>
);


