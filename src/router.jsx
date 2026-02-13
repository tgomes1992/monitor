import { createBrowserRouter } from 'react-router-dom';
import MonitorProcessamento from './pages/MonitorProcessamento.jsx';
import MonitorOtdx from './pages/MonitorOtdx.jsx';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/monitor-processamento',
    element: <MonitorProcessamento />,
  },
  {
    path: '/monitor-otdx',
    element: <MonitorOtdx />,
  },
  {
    path: '/',
    element: <h1>welcome a pagina inicial</h1>,
  },
  {
    path: '*',
    element: (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Página não encontrada</h2>
        <p>A rota acessada não existe.</p>
      </div>
    ),
  },
]);

export default router;

