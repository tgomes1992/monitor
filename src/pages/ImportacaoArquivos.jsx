import { useState } from 'react';
import HeaderText from '../components/HeaderText/index.jsx';
import '../App.css';

function ImportacaoArquivos() {
    const [arquivo, setArquivo] = useState(null);
    const [tipoArquivo, setTipoArquivo] = useState('');
    const [fileName, setFileName] = useState('Selecione o Arquivo');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArquivo(file);
            setFileName(file.name);
        } else {
            setArquivo(null);
            setFileName('Selecione o Arquivo');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!arquivo) {
            setMessage({ type: 'error', text: 'Por favor, selecione um arquivo.' });
            return;
        }

        if (!tipoArquivo) {
            setMessage({ type: 'error', text: 'Por favor, selecione o tipo de importação.' });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            // TODO: Replace with your actual API endpoint
            const formData = new FormData();
            formData.append('arquivo', arquivo);
            formData.append('tipoarquivo', tipoArquivo);

            // const response = await fetch('/api/importacao', {
            //     method: 'POST',
            //     body: formData
            // });
            // const data = await response.json();

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setMessage({ type: 'success', text: 'Arquivo enviado com sucesso!' });
            
            // Reset form
            setArquivo(null);
            setFileName('Selecione o Arquivo');
            setTipoArquivo('');
            e.target.reset();
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
            setMessage({ type: 'error', text: 'Erro ao enviar arquivo. Tente novamente.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                <HeaderText text="Importação de Arquivos" />
                
                <div style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '2.5rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* File Input */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label 
                                htmlFor="arquivo" 
                                style={{ 
                                    display: 'block', 
                                    marginBottom: '0.75rem', 
                                    fontSize: '0.95rem',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: '500'
                                }}
                            >
                                Arquivo
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="file" 
                                    id="arquivo"
                                    name="arquivo"
                                    onChange={handleFileChange}
                                    style={{
                                        position: 'absolute',
                                        opacity: 0,
                                        width: '100%',
                                        height: '100%',
                                        cursor: 'pointer',
                                        zIndex: 2
                                    }}
                                />
                                <div style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(30, 41, 59, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    color: arquivo ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <span>{fileName}</span>
                                    <span style={{
                                        padding: '0.4rem 0.8rem',
                                        background: '#64748b',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        fontWeight: '500'
                                    }}>
                                        Escolher arquivo
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Select Tipo de Importação */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label 
                                htmlFor="tipoarquivo" 
                                style={{ 
                                    display: 'block', 
                                    marginBottom: '0.75rem', 
                                    fontSize: '0.95rem',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: '500'
                                }}
                            >
                                Tipo de Importação
                            </label>
                            <select 
                                id="tipoarquivo"
                                name="tipoarquivo"
                                value={tipoArquivo}
                                onChange={(e) => setTipoArquivo(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(30, 41, 59, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    color: tipoArquivo ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <option value="" disabled>Selecione o tipo de importação</option>
                                <option value="dagenda" style={{ background: '#1e293b', color: '#ffffff' }}>DAGENDA</option>
                            </select>
                        </div>

                        {/* Message Display */}
                        {message.text && (
                            <div style={{
                                padding: '1rem',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                                background: message.type === 'success' 
                                    ? 'rgba(34, 197, 94, 0.2)' 
                                    : 'rgba(239, 68, 68, 0.2)',
                                border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`,
                                color: message.type === 'success' ? '#22c55e' : '#ef4444',
                                fontSize: '0.9rem'
                            }}>
                                {message.text}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1.5rem',
                                background: isSubmitting ? '#475569' : '#64748b',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.background = '#475569';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.background = '#64748b';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>

                {/* Help Text */}
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                }}>
                    <strong style={{ color: '#06b6d4' }}>Instruções:</strong>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                        <li>Selecione o arquivo que deseja importar</li>
                        <li>Escolha o tipo de importação correspondente</li>
                        <li>Clique em "Enviar" para processar o arquivo</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ImportacaoArquivos;
