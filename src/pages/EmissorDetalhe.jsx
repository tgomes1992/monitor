import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmissorDetalhePage = () => {
  const { cnpj } = useParams(); // Assuming route is /emissor/:cnpj
  
  // Mock Data
  const [emissor] = useState({ name: 'EMPRESA EXEMPLO S.A.', cnpj: cnpj || '12.345.678/0001-90' });
  const [emails, setEmails] = useState([
    { id: 1, email: 'financeiro@exemplo.com', tipo: 'PMT' },
    { id: 2, email: 'contato@exemplo.com', tipo: 'COBRANCA' },
  ]);
  const [ativos, setAtivos] = useState([
    { cd_cetip: 'CETIP123', cd_escritural: 'ESC999', dataVencimento: '2026-12-31' },
    { cd_cetip: 'CETIP456', cd_escritural: 'ESC888', dataVencimento: '2027-06-15' },
  ]);

  const [newEmail, setNewEmail] = useState({ type: '', address: '' });

  // Init Materialize Select
  useEffect(() => {
    if (window.M && window.M.FormSelect) {
      window.M.FormSelect.init(document.querySelectorAll('select'), {});
    }
  }, []);

  return (
    <div className="dashboard-wrapper fade-in">
      <div className="container">

        {/* --- Header --- */}
        <div className="custom-header-card mb-4">
          <div className="card-glass-overlay"></div>
          <div className="card-glow-accent"></div>
          <div className="header-title-container">
            <div className="header-accent">
              <span className="accent-pipe-glow">|</span>
              <span className="accent-pipe">|</span>
            </div>
            <div>
              <h1 className="header-main-text" style={{ fontSize: '2.5rem' }}>{emissor.name}</h1>
              <p className="card-value" style={{ fontSize: '1.2rem', opacity: 0.7 }}>{emissor.cnpj}</p>
            </div>
          </div>
        </div>

        {/* --- Section 1: Email Management --- */}
        <div className="row slide-up">
          <div className="col s12">
            <div className="custom-card-style" style={{ padding: '1.5rem' }}>
              <div className="glass-shine"></div>
              <h5 style={{ color: '#00e5ff', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                <i className="material-icons left">contact_mail</i> Gestão de E-mails
              </h5>

              {/* Email Form */}
              <div className="row">
                <div className="input-field col s12 m5">
                  <select 
                    value={newEmail.type}
                    onChange={(e) => setNewEmail({...newEmail, type: e.target.value})}
                  >
                    <option value="" disabled>Selecione o Tipo</option>
                    <option value="PMT">PMT</option>
                    <option value="CUSTO_CETIP">Custo Cetip</option>
                    <option value="COBRANCA">Cobrança</option>
                    <option value="ALL">Todas as Opções</option>
                  </select>
                  <label>Tipo de E-mail</label>
                </div>
                <div className="input-field col s12 m5">
                  <input 
                    id="email_input" 
                    type="email" 
                    className="validate"
                    value={newEmail.address}
                    onChange={(e) => setNewEmail({...newEmail, address: e.target.value})}
                    style={{ color: '#fff' }}
                  />
                  <label htmlFor="email_input">Endereço de E-mail</label>
                </div>
                <div className="col s12 m2" style={{ paddingTop: '1.5rem' }}>
                  <button className="btn waves-effect waves-light" style={{ backgroundColor: '#00e5ff', color: '#000', width: '100%' }}>
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>

              {/* Email List Table */}
              <table className="highlight responsive-table" style={{ marginTop: '1rem' }}>
                <thead>
                  <tr>
                    <th style={{ color: '#00e5ff' }}>Email</th>
                    <th style={{ color: '#00e5ff' }}>Tipo</th>
                    <th className="center-align" style={{ color: '#00e5ff' }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email) => (
                    <tr key={email.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td>{email.email}</td>
                      <td><span className="info-row" style={{ display: 'inline-block' }}>{email.tipo}</span></td>
                      <td className="center-align">
                        <button className="btn-small waves-effect waves-red transparent" style={{ border: '1px solid #e74c3c', color: '#e74c3c' }}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Section 2: Complementary Data Form --- */}
        <div className="row slide-up">
          <div className="col s12">
            <div className="custom-card-style" style={{ padding: '1.5rem' }}>
              <div className="glass-shine"></div>
              <h5 style={{ color: '#00e5ff', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                <i className="material-icons left">edit_note</i> Dados Complementares
              </h5>
              
              {/* Simulated Form Fields (replacing bootstrap_form) */}
              <form>
                <div className="row">
                   <div className="input-field col s12 m6">
                      <input id="field1" type="text" className="validate" style={{ color: '#fff' }} />
                      <label htmlFor="field1">Responsável Operacional</label>
                   </div>
                   <div className="input-field col s12 m6">
                      <input id="field2" type="text" className="validate" style={{ color: '#fff' }} />
                      <label htmlFor="field2">Telefone de Contato</label>
                   </div>
                </div>
                <button className="btn waves-effect waves-light right" style={{ backgroundColor: '#00e5ff', color: '#000' }}>
                  Salvar Alterações
                </button>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>

        {/* --- Section 3: Ativos O2 --- */}
        <div className="row slide-up">
          <div className="col s12">
            <div className="custom-card-style" style={{ padding: '1.5rem' }}>
               <div className="glass-shine"></div>
               <h5 style={{ color: '#00e5ff', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                <i className="material-icons left">layers</i> Ativos O2
              </h5>
              
              <table className="highlight responsive-table">
                <thead>
                   <tr>
                     <th style={{ color: '#00e5ff' }}>Código Cetip</th>
                     <th style={{ color: '#00e5ff' }}>Código Escritural</th>
                     <th style={{ color: '#00e5ff' }}>Data Vencimento</th>
                   </tr>
                </thead>
                <tbody>
                   {ativos.map((ativo, idx) => (
                     <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                       <td style={{ fontFamily: 'Roboto Mono' }}>{ativo.cd_cetip}</td>
                       <td style={{ fontFamily: 'Roboto Mono' }}>{ativo.cd_escritural}</td>
                       <td>{ativo.dataVencimento}</td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmissorDetalhePage;