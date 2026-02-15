import React, { useState } from 'react';

const ExclusaoNotasPage = () => {
  const [noteNumber, setNoteNumber] = useState('');
  // Simulating a flash message state
  const [message, setMessage] = useState(null); 

  const handleDelete = (e) => {
    e.preventDefault();
    // Logic to delete note
    setMessage({ type: 'success', text: `Nota ${noteNumber} excluída com sucesso.` });
    setNoteNumber('');
  };

  return (
    <div className="dashboard-wrapper fade-in">
      <div className="container">

        {/* Header */}
        <div className="custom-header-card mb-4">
          <div className="card-glass-overlay"></div>
          <div className="card-glow-accent"></div>
          <div className="header-title-container">
             <div className="header-accent">
                <span className="accent-pipe-glow">|</span>
                <span className="accent-pipe">|</span>
             </div>
             <div>
                <h1 className="header-main-text">Exclusão de Notas JCOT</h1>
             </div>
          </div>
        </div>

        {/* Alert/Message Area */}
        {message && (
          <div className="row slide-down">
             <div className="col s12">
               <div 
                 className="card-panel valign-wrapper" 
                 style={{ 
                   backgroundColor: message.type === 'success' ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)', 
                   border: `1px solid ${message.type === 'success' ? '#27ae60' : '#e74c3c'}`,
                   boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                 }}
               >
                 <i className="material-icons" style={{ color: '#fff', marginRight: '10px' }}>
                    {message.type === 'success' ? 'check_circle' : 'error'}
                 </i>
                 <span style={{ color: '#fff' }}>{message.text}</span>
                 <i 
                   className="material-icons right" 
                   style={{ cursor: 'pointer', marginLeft: 'auto', opacity: 0.7 }}
                   onClick={() => setMessage(null)}
                 >
                   close
                 </i>
               </div>
             </div>
          </div>
        )}

        {/* Form Card */}
        <div className="row slide-up">
          <div className="col s12 m6 offset-m3">
            <div className="custom-card-style" style={{ padding: '2rem' }}>
               <div className="glass-shine"></div>
               
               <p style={{ opacity: 0.8, marginBottom: '2rem' }} className="center-align">
                 Exibe o Papel Cota no JCOT e a sua respectiva data no sistema de Passivo.
               </p>

               <form onSubmit={handleDelete}>
                 <div className="input-field">
                    <i className="material-icons prefix" style={{ color: '#e74c3c' }}>delete_forever</i>
                    <input 
                      id="note_number" 
                      type="text" 
                      value={noteNumber}
                      onChange={(e) => setNoteNumber(e.target.value)}
                      style={{ color: '#fff', borderBottom: '1px solid #e74c3c' }}
                    />
                    <label htmlFor="note_number" style={{ color: '#e74c3c' }}>Número da Nota</label>
                 </div>

                 <div className="center-align" style={{ marginTop: '3rem' }}>
                    <button 
                      type="submit" 
                      className="btn-large waves-effect waves-light"
                      style={{ 
                        backgroundColor: '#e74c3c', // Red for delete actions
                        color: '#fff', 
                        borderRadius: '8px',
                        width: '100%',
                        boxShadow: '0 0 15px rgba(231, 76, 60, 0.4)'
                      }}
                    >
                      Excluir Nota
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

export default ExclusaoNotasPage;