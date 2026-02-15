import React, { useState, useEffect } from 'react';

const CustoCetipPage = () => {
  const [file, setFile] = useState(null);
  const [importType, setImportType] = useState('');

  // Initialize Materialize Select on component mount
  useEffect(() => {
    if (window.M && window.M.FormSelect) {
      const elems = document.querySelectorAll('select');
      window.M.FormSelect.init(elems, {});
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for API logic
    console.log('Enviando:', { file, importType });
    
    // Example: formData.append('arquivo', file);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="container">

        {/* --- Header Section (Cyber Style) --- */}
        <div className="custom-header-card mb-4">
          <div className="card-glass-overlay"></div>
          <div className="card-glow-accent"></div>

          <div className="header-title-container">
            <div className="header-accent">
              <span className="accent-pipe-glow">|</span>
              <span className="accent-pipe">|</span>
            </div>
            <div>
              <h1 className="header-main-text">Importação Custo Cetip</h1>
              <div className="header-line-wrapper">
                <div className="header-line"></div>
                <div className="header-line-glow"></div>
              </div>
            </div>
          </div>
          
          <p className="card-description">
            Envie arquivos de custo para processamento no sistema.
          </p>
        </div>

        {/* --- Form Section (Glass Card) --- */}
        <div className="row slide-up">
          <div className="col s12 m8 offset-m2">
            
            <div className="custom-card-style" style={{ padding: '2rem' }}>
              <div className="glass-shine"></div>
              
              <form onSubmit={handleSubmit}>
                
                {/* File Input */}
                <div className="file-field input-field" style={{ marginTop: '2rem' }}>
                  <div className="btn" style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)', border: '1px solid #00e5ff', color: '#00e5ff' }}>
                    <span>Arquivo</span>
                    <input 
                      type="file" 
                      id="arquivo" 
                      onChange={handleFileChange} 
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input 
                      className="file-path validate" 
                      type="text" 
                      placeholder="Selecione o Arquivo" 
                      style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)' }}
                    />
                  </div>
                </div>

                {/* Select Input */}
                <div className="input-field" style={{ marginTop: '2rem' }}>
                  <select 
                    value={importType} 
                    onChange={(e) => setImportType(e.target.value)}
                    className="validate"
                    required
                  >
                    <option value="" disabled>Selecione o tipo de importação</option>
                    <option value="dagenda">Custo Cetip</option>
                  </select>
                  <label style={{ color: '#00e5ff', fontSize: '1rem' }}>Tipo de Importação</label>
                </div>

                {/* Submit Button */}
                <div className="center-align" style={{ marginTop: '3rem', marginBottom: '1rem' }}>
                  <button 
                    type="submit" 
                    className="btn-large waves-effect waves-light"
                    style={{ 
                      backgroundColor: '#00e5ff', 
                      color: '#000', 
                      fontWeight: 'bold', 
                      width: '100%', 
                      borderRadius: '8px',
                      boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)'
                    }}
                  >
                    <i className="material-icons left">cloud_upload</i>
                    Enviar Arquivo
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

export default CustoCetipPage;