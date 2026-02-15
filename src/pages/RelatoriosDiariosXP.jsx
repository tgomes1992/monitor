import { useState } from 'react';
import HeaderText from '../components/HeaderText/index.jsx';
import '../App.css';

function RelatoriosDiariosXP() {
    const [data, setData] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!data) {
            setMessages([{ type: 'warning', text: 'Por favor, selecione uma data.' }]);
            return;
        }

        setIsSubmitting(true);
        setMessages([]);

        try {
            // TODO: Replace with your actual API endpoint
            // const response = await fetch('/api/arquivo-retorno', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ data })
            // });
            // const result = await response.json();

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setMessages([{ 
                type: 'success', 
                text: `Arquivo retorno gerado com sucesso para a data ${new Date(data).toLocaleDateString('pt-BR')}!` 
            }]);
            
            // Reset form after success
            // setData('');
        } catch (error) {
            console.error('Erro ao gerar arquivo:', error);
            setMessages([{ 
                type: 'error', 
                text: 'Erro ao gerar arquivo retorno. Tente novamente.' 
            }]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const dismissMessage = (index) => {
        setMessages(prev => prev.filter((_, i) => i !== index));
    };

    const getMessageStyle = (type) => {
        const baseStyle = {
            padding: '1rem 1.25rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            animation: 'fadeIn 0.3s ease-in'
        };

        switch(type) {
            case 'success':
                return {
                    ...baseStyle,
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid #22c55e',
                    color: '#22c55e'
                };
            case 'error':
            case 'danger':
                return {
                    ...baseStyle,
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    color: '#ef4444'
                };
            case 'warning':
                return {
                    ...baseStyle,
                    background: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid #fbbf24',
                    color: '#fbbf24'
                };
            case 'info':
                return {
                    ...baseStyle,
                    background: 'rgba(6, 182, 212, 0.2)',
                    border: '1px solid #06b6d4',
                    color: '#06b6d4'
                };
            default:
                return baseStyle;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                {/* Messages */}
                {messages.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        {messages.map((message, index) => (
                            <div key={index} style={getMessageStyle(message.type)} role="alert">
                                <span>{message.text}</span>
                                <button 
                                    onClick={() => dismissMessage(index)}
                                    aria-label="Close"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'inherit',
                                        fontSize: '1.25rem',
                                        cursor: 'pointer',
                                        padding: '0 0.5rem',
                                        opacity: 0.7,
                                        transition: 'opacity 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = 1}
                                    onMouseLeave={(e) => e.target.style.opacity = 0.7}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <HeaderText text="Relatórios Diários XP" />
                
                <div style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '2.5rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                    <form onSubmit={handleSubmit}>
                        {/* Date Input */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label 
                                htmlFor="data" 
                                style={{ 
                                    display: 'block', 
                                    marginBottom: '0.75rem', 
                                    fontSize: '0.95rem',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: '500'
                                }}
                            >
                                Data das Movimentações
                            </label>
                            <input 
                                type="date" 
                                id="data"
                                name="data"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="form-control"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(30, 41, 59, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    colorScheme: 'dark'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#06b6d4';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

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
                            {isSubmitting ? 'Gerando...' : 'Gerar Arquivo Retorno'}
                        </button>
                    </form>
                </div>

                {/* Info Box */}
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem 1.25rem',
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                }}>
                    <strong style={{ color: '#06b6d4' }}>Informação:</strong> Selecione a data das movimentações para gerar o arquivo de retorno correspondente.
                </div>
            </div>
        </div>
    );
}

export default RelatoriosDiariosXP;
