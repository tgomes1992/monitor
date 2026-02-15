import { useState, useEffect } from 'react';
import HeaderText from '../components/HeaderText/index.jsx';
import '../App.css';

function EventosAtivo() {
    const [ativo, setAtivo] = useState('');
    const [diaAtual, setDiaAtual] = useState('');
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        try {
            // TODO: Replace with your actual API endpoint
            // Get ativo from URL params if needed
            // const params = new URLSearchParams(window.location.search);
            // const ativoParam = params.get('ativo');
            // const response = await fetch(`/api/eventos/${ativoParam}`);
            // const data = await response.json();
            
            // Mock data for demonstration
            const mockData = {
                ativo: 'PETR4',
                dia: new Date().toLocaleDateString('pt-BR'),
                eventos: [
                    {
                        'Data Original': '2026-02-10',
                        'Data da Efetivação': '2026-02-12',
                        'Data de Liquidação': '2026-02-15',
                        'Título': 'Dividendos',
                        'Tipo': 'Dividendo'
                    },
                    {
                        'Data Original': '2026-02-08',
                        'Data da Efetivação': '2026-02-10',
                        'Data de Liquidação': '2026-02-13',
                        'Título': 'Juros sobre Capital Próprio',
                        'Tipo': 'JCP'
                    },
                    {
                        'Data Original': '2026-02-05',
                        'Data da Efetivação': '2026-02-08',
                        'Data de Liquidação': '2026-02-11',
                        'Título': 'Bonificação',
                        'Tipo': 'Bonificação'
                    }
                ]
            };
            
            setAtivo(mockData.ativo);
            setDiaAtual(mockData.dia);
            setEventos(mockData.eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1rem' }}>
                <HeaderText text={`Eventos Ativo - ${ativo}`} />
                
                <h3 style={{ 
                    fontSize: '1.2rem', 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    marginBottom: '2rem',
                    fontWeight: '400'
                }}>
                    Dia Atual: <span style={{ color: '#06b6d4', fontWeight: '600' }}>{diaAtual}</span>
                </h3>

                <div style={{
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem 1.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{ 
                        fontSize: '1.3rem', 
                        color: '#06b6d4', 
                        margin: 0,
                        fontWeight: '600'
                    }}>
                        Eventos Hoje
                    </h2>
                </div>

                <div style={{ 
                    overflowX: 'auto', 
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginBottom: '2rem'
                }}>
                    <table className="striped" style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse',
                        fontSize: '0.95rem'
                    }}>
                        <thead>
                            <tr style={{ 
                                background: 'rgba(6, 182, 212, 0.1)',
                                borderBottom: '2px solid rgba(6, 182, 212, 0.3)'
                            }}>
                                <th style={{ 
                                    padding: '1rem 1.25rem', 
                                    textAlign: 'left', 
                                    color: '#06b6d4', 
                                    fontWeight: '600', 
                                    fontSize: '0.85rem', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px'
                                }}>
                                    Data da Original
                                </th>
                                <th style={{ 
                                    padding: '1rem 1.25rem', 
                                    textAlign: 'left', 
                                    color: '#06b6d4', 
                                    fontWeight: '600', 
                                    fontSize: '0.85rem', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px'
                                }}>
                                    Data de Efetivação
                                </th>
                                <th style={{ 
                                    padding: '1rem 1.25rem', 
                                    textAlign: 'left', 
                                    color: '#06b6d4', 
                                    fontWeight: '600', 
                                    fontSize: '0.85rem', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px'
                                }}>
                                    Data de Liquidação
                                </th>
                                <th style={{ 
                                    padding: '1rem 1.25rem', 
                                    textAlign: 'left', 
                                    color: '#06b6d4', 
                                    fontWeight: '600', 
                                    fontSize: '0.85rem', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px'
                                }}>
                                    Título
                                </th>
                                <th style={{ 
                                    padding: '1rem 1.25rem', 
                                    textAlign: 'left', 
                                    color: '#06b6d4', 
                                    fontWeight: '600', 
                                    fontSize: '0.85rem', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px'
                                }}>
                                    Tipo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.length === 0 ? (
                                <tr>
                                    <td 
                                        colSpan="5" 
                                        style={{ 
                                            padding: '2rem', 
                                            textAlign: 'center', 
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        Nenhum evento encontrado
                                    </td>
                                </tr>
                            ) : (
                                eventos.map((evento, index) => (
                                    <tr 
                                        key={index}
                                        style={{ 
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                            transition: 'background 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 1 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'}
                                    >
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            color: 'rgba(255, 255, 255, 0.85)', 
                                            verticalAlign: 'middle'
                                        }}>
                                            {evento['Data Original']}
                                        </td>
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            color: 'rgba(255, 255, 255, 0.85)', 
                                            verticalAlign: 'middle'
                                        }}>
                                            {evento['Data da Efetivação']}
                                        </td>
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            color: 'rgba(255, 255, 255, 0.85)', 
                                            verticalAlign: 'middle'
                                        }}>
                                            {evento['Data de Liquidação']}
                                        </td>
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            color: 'rgba(255, 255, 255, 0.85)', 
                                            verticalAlign: 'middle'
                                        }}>
                                            {evento['Título']}
                                        </td>
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            verticalAlign: 'middle'
                                        }}>
                                            <span style={{
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                background: 'rgba(6, 182, 212, 0.2)',
                                                color: '#06b6d4'
                                            }}>
                                                {evento['Tipo']}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EventosAtivo;
