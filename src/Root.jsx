import React, { useEffect } from 'react';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';

function Root() {
  useEffect(() => {
    if (window.M && typeof window.M.AutoInit === 'function') {
      window.M.AutoInit();
    }
  }, []);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default Root;

