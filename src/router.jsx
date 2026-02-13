import { createBrowserRouter } from 'react-router-dom';
import MonitorProcessamento from './pages/MonitorProcessamento.jsx';
import MonitorOtdx from './pages/MonitorOtdx.jsx';
import React from 'react';
import SimplePage from "./pages/SimplePage.jsx";
import Layout from './Layout.jsx';



const jcothelperroutes = [
  {
    path: '/listfundos' ,element: <SimplePage description="Jcot Helper - Listagem de Fundos" title="Listagem de Fundos" />,
  }  ,
  {
    path :'/excluir_nota_jcot' ,  element: <SimplePage description="Excluir notas jcot" title="Excluir Notas Jcot" />
  } ,   {
    path :'/integrador_o2' ,  element: <SimplePage description="Integradro de Movimentos o2" title="Integrador o2" />
  } ,
]



const rendafixaroutes = [
  {
    path :'/eventos' ,  element: <SimplePage description="Eventos Diários" title="Eventos Diários" />
  } ,
  {
    path :'/importacoes_cetip' ,  element: <SimplePage description="Imnportação DAGENDA" title="iMPORTAÇÃO Arquivo DAGENDA" />
  } ,
]


const conciliacaoRoutes = [
  {
    path :'/batimentos-diarios' ,  element: <SimplePage description="Batimentos Diários" title="Batimentos Diários" />
  } ,
  {
    path :'/conciliacao' ,  element: <SimplePage description="Conciliação Diária" title="Conciliação Diária" />
  } ,
]


const regulatorioRoutes = [
  {
    path :'/regulatorio/5401' ,  element: <SimplePage description="5401" title="5401" />
  } ,
]

const emissoresApp = [
  {
    path :'/emissores' ,  element: <SimplePage description="Emissores" title="Emissores" />
  } ,
  {
    path: '/custo-cetip' ,  element : <SimplePage description="Custo Cetip" title="Custo Cetip" />
  }
]

const BucketArquivosRoutes = [
  {
    path :'/bucket-arquivos' ,  element: <SimplePage description="Bucket de Arquivos" title="Bucket de Arquivos" />
  } ,
]

const JobsRoutes = [
  {
    path :'/jobs' ,  element: <SimplePage description="JobsRoutes" title="Jobs" />
  } ,
]


const MonitoresRoutes = [
  {
    path: '/monitor-processamento',
    element: <MonitorProcessamento />,
  },
  {
    path: '/monitor-otdx',
    element: <MonitorOtdx />,
  }
]



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>welcome a pagina inicial</h1>,
      },
      ...jcothelperroutes,
      ...rendafixaroutes,
      ...conciliacaoRoutes,
      ...regulatorioRoutes,
      ...emissoresApp,
      ...BucketArquivosRoutes,
      ...JobsRoutes,
      ...MonitoresRoutes,
      {
        path: '*',
        element: (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Página não encontrada</h2>
            <p>A rota acessada não existe.</p>
          </div>
        ),
      },
    ],
  },
]);

export default router;

