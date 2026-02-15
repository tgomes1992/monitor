import React, { useState, useEffect } from 'react';

const QuantitativoPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reportType, setReportType] = useState('');

  // Initialize Materialize Select
  useEffect(() => {
    if (window.M && window.M.FormSelect) {
      const elems = document.querySelectorAll('select');
      window.M.FormSelect.init(elems, {});
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { selectedDate, reportType });
    // API logic goes here
  };

  return (
    <div className="dashboard-wrapper fade-in">
      <div className="container">

        {/* --- Header Section --- */}
        <div className="custom-header-card mb-4">
          <div className="card-glass-overlay"></div>
          <div className="card-glow-accent"></div>

          <div className="header-title-container">
            <div className="header-accent">
              <span className="accent-pipe-glow">|</span>
              <span className="accent-pipe">|</span>
            </div>
            <div>
              <h1 className="header-main-text">Quantitativo</h1>
              <div className="header-line-wrapper">
                <div className="header-line"></div>
                <div className="header-line-glow"></div>
              </div>
            </div>
          </div>
          <p className="card-description">
            Geração de relatórios quantitativos por período.
          </p>
        </div>

        {/* --- Filter Form Section --- */}
        <div className="row slide-up">
          <div className="col s12 m8 offset-m2">
            
            <div className="custom-card-style" style={{ padding: '2rem' }}>
              <div className="glass-shine"></div>
              
              <form onSubmit={handleSearch}>
                
                {/* Simulated Form Field (replacing bootstrap_form) */}
                <div className="input-field" style={{ marginTop: '1.5rem' }}>
                  <i className="material-icons prefix" style={{ color: '#00e5ff' }}>pie_chart</i>
                  <select 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    style={{ color: '#fff' }}
                  >
                    <option value="" disabled>Selecione o Tipo de Dado</option>
                    <option value="transacoes">Transações Totais</option>
                    <option value="erros">Relatório de Erros</option>
                    <option value="usuarios">Novos Usuários</option>
                  </select>
                  <label style={{ color: 'rgba(255,255,255,0.7)' }}>Tipo de Relatório</label>
                </div>

                {/* Date Input */}
                <div className="input-field" style={{ marginTop: '2rem' }}>
                  <i className="material-icons prefix" style={{ color: '#00e5ff' }}>calendar_today</i>
                  <input 
                    id="data_input" 
                    type="date" 
                    className="validate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ 
                      color: '#fff', 
                      borderBottom: '1px solid rgba(255,255,255,0.3)',
                      colorScheme: 'dark' // Ensures the calendar picker is dark mode
                    }} 
                  />
                  <label 
                    htmlFor="data_input" 
                    className="active" // Keeps label floating
                    style={{ color: '#00e5ff' }}
                  >
                    Data de Referência
                  </label>
                </div>

                {/* Submit Button */}
                <div className="center-align" style={{ marginTop: '3rem' }}>
                  <button 
                    type="submit" 
                    className="btn-large waves-effect waves-light"
                    style={{ 
                      backgroundColor: '#00e5ff', 
                      color: '#000', 
                      fontWeight: 'bold', 
                      borderRadius: '8px',
                      minWidth: '200px',
                      boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)'
                    }}
                  >
                    <i className="material-icons right">search</i>
                    Buscar
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default QuantitativoPage;