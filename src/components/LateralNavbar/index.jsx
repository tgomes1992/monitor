import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const LateralNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Navigation structure organized by sections
  const navSections = [
    {
      title: 'Monitores',
      icon: 'monitoring',
      routes: [
        { path: '/monitor-processamento', label: 'Monitor Processamento', icon: 'schedule' },
        { path: '/monitor-otdx', label: 'Monitor OTDX', icon: 'analytics' },
      ],
    },
    {
      title: 'JCOT Helper',
      icon: 'folder_special',
      routes: [
        { path: '/listfundos', label: 'Listagem de Fundos', icon: 'list' },
        { path: '/excluir_nota_jcot', label: 'Excluir Notas JCOT', icon: 'delete' },
        { path: '/integrador_o2', label: 'Integrador O2', icon: 'merge_type' },
      ],
    },
    {
      title: 'Renda Fixa',
      icon: 'trending_up',
      routes: [
        { path: '/eventos', label: 'Eventos Diários', icon: 'event' },
        { path: '/importacoes_cetip', label: 'Importação DAGENDA', icon: 'cloud_upload' },
      ],
    },
    {
      title: 'Conciliação',
      icon: 'check_circle',
      routes: [
        { path: '/batimentos-diarios', label: 'Batimentos Diários', icon: 'done_all' },
        { path: '/conciliacao', label: 'Conciliação Diária', icon: 'verified' },
      ],
    },
    {
      title: 'Regulatório',
      icon: 'gavel',
      routes: [
        { path: '/regulatorio/5401', label: '5401', icon: 'description' },
      ],
    },
    {
      title: 'Emissores',
      icon: 'business',
      routes: [
        { path: '/emissores', label: 'Emissores', icon: 'apartment' },
        { path: '/custo-cetip', label: 'Custo CETIP', icon: 'attach_money' },
      ],
    },
    {
      title: 'Gerenciamento',
      icon: 'settings',
      routes: [
        { path: '/bucket-arquivos', label: 'Bucket de Arquivos', icon: 'folder' },
        { path: '/jobs', label: 'Jobs', icon: 'work' },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`lateral-navbar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header with toggle button */}
      <div className="navbar-header">
        <div className="logo-container">
          {!isCollapsed && (
            <>
              <span className="logo-icon">
                <i className="material-icons">dashboard</i>
              </span>
              <span className="logo-text">Monitor</span>
            </>
          )}
        </div>
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir' : 'Recolher'}
        >
          <i className="material-icons">
            {isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}
          </i>
        </button>
      </div>

      {/* Navigation sections */}
      <nav className="navbar-nav">
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="nav-section">
            {!isCollapsed && (
              <div className="section-details">
                <i className="material-icons section-icon">{section.icon}</i>
                <span className="section-title">{section.title}</span>
              </div>
            )}
            <ul className="nav-list">
              {section.routes.map((route, routeIndex) => (
                <li key={routeIndex} className="nav-item">
                  <Link
                    to={route.path}
                    className={`nav-link ${isActive(route.path) ? 'active' : ''}`}
                    title={route.label}
                  >
                    <i className="material-icons nav-icon">{route.icon}</i>
                    {!isCollapsed && <span className="nav-label">{route.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Home link at bottom */}
      <div className="navbar-footer">
        <Link
          to="/"
          className={`nav-link home-link ${isActive('/') ? 'active' : ''}`}
          title="Página Inicial"
        >
          <i className="material-icons nav-icon">home</i>
          {!isCollapsed && <span className="nav-label">Página Inicial</span>}
        </Link>
      </div>
    </aside>
  );
};

export default LateralNavbar;

