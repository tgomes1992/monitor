import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderText from '../components/HeaderText';

const EmissoresList = () => {
  // Mock data to simulate the Django 'emissores' context
  const [emissores] = useState([
    { id: 1, name: 'Empresa Exemplo S.A.', cnpj: '12.345.678/0001-90' },
    { id: 2, name: 'Banco Digital Ltda', cnpj: '98.765.432/0001-10' },
    { id: 3, name: 'Tech Solutions Corp', cnpj: '45.123.789/0001-55' },
    { id: 4, name: 'Serviços Financeiros Global', cnpj: '11.222.333/0001-44' },
    { id: 5, name: 'Indústria de Base S.A.', cnpj: '55.666.777/0001-88' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="dashboard-wrapper">
      <div className="container">

        {/* --- Header Section --- */}
        <div className="custom-header-card mb-4">
          <div className="card-glass-overlay"></div>
          <div className="card-glow-accent"></div>

          <div className="header-title-container">
            <div className="header-accent">

            </div>
            <div>
              <HeaderText text="Emissores Cadastrados" />
            </div>
          </div>
        </div>

        {/* --- Filter & Actions Toolbar --- */}
        <div className="row">
          <div className="col s12">
            <div className="custom-card-style" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <div className="glass-shine"></div>
              
              <div className="row" style={{ marginBottom: 0 }}>
                {/* Search Bar (Replaces bootstrap_form) */}
                <div className="input-field col s12 l5">
                  <i className="material-icons prefix" style={{ color: '#00e5ff' }}>search</i>
                  <input 
                    id="search" 
                    type="text" 
                    style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <label htmlFor="search" style={{ color: 'rgba(255,255,255,0.7)' }}>Buscar por Nome ou CNPJ</label>
                </div>

                {/* Report Buttons */}
                <div className="col s12 l7 right-align" style={{ marginTop: '1rem' }}>
                   {/* Search Submit */}
                  <button className="btn waves-effect waves-light" style={{ backgroundColor: '#00e5ff', color: '#000', marginRight: '10px' }}>
                    <i className="material-icons left">filter_list</i>
                    Filtrar
                  </button>

                  {/* Relatório Sem E-mail */}
                  <Link 
                    to="/relatorios/emissores-sem-email" 
                    className="btn-flat waves-effect" 
                    style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', marginRight: '10px' }}
                  >
                    <i className="material-icons left" style={{ color: '#f39c12' }}>warning</i>
                    Sem E-mail
                  </Link>

                  {/* Relatório Sem Contas */}
                  <Link 
                    to="/relatorios/emissores-sem-contas" 
                    className="btn-flat waves-effect" 
                    style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}
                  >
                    <i className="material-icons left" style={{ color: '#e74c3c' }}>money_off</i>
                    Sem Contas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Data Table --- */}
        <div className="row slide-up">
          <div className="col s12">
            <div className="custom-card-style" style={{ padding: '0' }}>
              <div className="glass-shine"></div>
              
              <table className="highlight responsive-table centered" style={{ color: '#fff' }}>
                <thead style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.3)' }}>
                  <tr>
                    <th style={{ color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '1px' }}>Nome</th>
                    <th style={{ color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '1px' }}>CNPJ</th>
                    <th style={{ color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '1px' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {emissores.map((emissor) => (
                    <tr key={emissor.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ fontWeight: '500' }}>{emissor.name}</td>
                      <td style={{ fontFamily: 'Roboto Mono', opacity: 0.8 }}>{emissor.cnpj}</td>
                      <td>
                        <Link 
                          to={`/emissores/detalhe/${emissor.cnpj}`} 
                          className="btn-small waves-effect waves-light"
                          style={{ 
                            backgroundColor: 'transparent', 
                            border: '1px solid #00e5ff', 
                            color: '#00e5ff',
                            boxShadow: 'none'
                          }}
                        >
                          Detalhes
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Pagination Footer --- */}
        {/* Using the .pagination-footer class from your App.css */}
        <div className="pagination-footer">
          <ul className="pagination" style={{ margin: 0 }}>
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            <li className="active" style={{ backgroundColor: '#00e5ff' }}><a href="#!" style={{ color: '#000' }}>1</a></li>
            <li className="waves-effect"><a href="#!" style={{ color: '#fff' }}>2</a></li>
            <li className="waves-effect"><a href="#!" style={{ color: '#fff' }}>3</a></li>
            <li className="waves-effect"><a href="#!" style={{ color: '#fff' }}>4</a></li>
            <li className="waves-effect"><a href="#!"><i className="material-icons" style={{ color: '#fff' }}>chevron_right</i></a></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default EmissoresList;