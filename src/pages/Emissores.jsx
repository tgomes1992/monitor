import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const EmissoresPage = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="container">
        
        {/* Module Header - Replaces the legacy <nav> */}
        <div className="custom-header-card mb-4">
          <div className="card-glass-overlay"></div>
          <div className="card-glow-accent"></div>

          {/* Title Section */}
          <div className="header-title-container">
            <div className="header-accent">
              <span className="accent-pipe-glow">|</span>
              <span className="accent-pipe">|</span>
            </div>
            <div>
              <h1 className="header-main-text">Controle de Emissores</h1>
              <div className="header-line-wrapper">
                <div className="header-line"></div>
                <div className="header-line-glow"></div>
              </div>
            </div>
          </div>

          {/* Actions/Navigation - Replaces the legacy "nav-mobile" links */}
          <div className="row" style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <div className="col s12 m6 l4">
               {/* Converted "Cadastro E-mails" link */}
              <Link to="/emissores/emails" className="custom-card-style waves-effect waves-light" style={{ display: 'block', textDecoration: 'none' }}>
                <div className="card-content">
                  <div className="info-row">
                    <span className="info-label">Ação</span>
                    <i className="material-icons" style={{ color: '#00e5ff' }}>contact_mail</i>
                  </div>
                  <div className="center-align" style={{ padding: '10px 0' }}>
                    <span className="card-value" style={{ fontSize: '1.2rem' }}>Cadastro E-mails</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col s12 m6 l4">
               {/* Converted "Sincronizar O2" link */}
              <Link to="/emissores/sync-o2" className="custom-card-style waves-effect waves-light" style={{ display: 'block', textDecoration: 'none' }}>
                <div className="card-content">
                  <div className="info-row">
                    <span className="info-label">Integração</span>
                    <i className="material-icons" style={{ color: '#f39c12' }}>sync</i>
                  </div>
                  <div className="center-align" style={{ padding: '10px 0' }}>
                    <span className="card-value" style={{ fontSize: '1.2rem' }}>Sincronizar O2</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Area - Replaces {% block content %} */}
        <div className="row slide-up">
          <div className="col s12">
            <Outlet /> 
            {/* Or place direct content here if not using sub-routes */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmissoresPage;