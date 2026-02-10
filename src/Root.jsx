import React, { useEffect } from 'react';
import { StrictMode } from 'react';
import App from './App.jsx';

function Root() {
  useEffect(() => {
    if (window.M && typeof window.M.AutoInit === 'function') {
      window.M.AutoInit();
    }
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

export default Root;

