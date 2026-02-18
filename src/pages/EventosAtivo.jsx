import { useState, useEffect } from 'react';
import HeaderText from '../components/HeaderText/index.jsx';
import '../App.css';

function EventosAtivo() {
    const [ativo, setAtivo] = useState('');
    const [diaAtual, setDiaAtual] = useState('');
    const [eventos, setEventos] = useState([]);
    const [ativos, setAtivos] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        fetchAtivos();
        fetchEventos();
    }, []);

    const fetchAtivos = async () => {
        try {
            const response = await fetch(`http://portal-escrituracao:5001/eventos/api/eventos/ativos/cadastrados`);
            const data = await response.json();
            setAtivos(data.ativos || []);
        } catch (error) {
            console.error('Erro ao buscar ativos cadastrados:', error);
        }
    };

    const fetchEventos = async (selectedAtivo = '') => {
        try {
            const url = selectedAtivo
                ? `http://portal-escrituracao:5001/eventos/api/eventos/?ativo=${selectedAtivo}`
                : `http://portal-escrituracao:5001/eventos/api/eventos/`;

            const response = await fetch(url);
            const data = await response.json();

            const eventos_formatados = data.map(evento => ({
                'data_base': new Date(evento.data_base).toLocaleDateString('pt-BR'),
                'data_liquidacao': new Date(evento.data_liquidacao).toLocaleDateString('pt-BR'),
                'ativo': evento.ativo,
                'tipo': evento.tipo
            }));

            // Mock data for demonstration
            const mockData = {
                ativo: selectedAtivo || 'PETR4',
                dia: new Date().toLocaleDateString('pt-BR'),
                eventos: eventos_formatados
            };
            
            setAtivo(mockData.ativo);
            setDiaAtual(mockData.dia);
            setEventos(mockData.eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setShowSuggestions(value.length > 0);
        // Automatically fetch eventos as user types (automatic filter)
        if (value.length === 0) {
            fetchEventos();
        } else {
            fetchEventos(value);
        }
    };

    const handleAtivoSelect = (selectedAtivo) => {
        setSearchInput(selectedAtivo);
        setShowSuggestions(false);
        // If selectedAtivo is null or empty, fetch without parameters
        if (!selectedAtivo) {
            fetchEventos();
        } else {
            fetchEventos(selectedAtivo);
        }
    };

    const filteredAtivos = ativos.filter(ativoItem =>
        ativoItem.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="dashboard-wrapper">
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1rem' }}>
                <HeaderText text={"Eventos Diários"} />
                
                <div style={{ marginBottom: '2rem', position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '0.5rem',
                        fontWeight: '500'
                    }}>
                        Selecione um Ativo
                    </label>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInput}
                        onFocus={() => searchInput.length > 0 && setShowSuggestions(true)}
                        placeholder="Digite para buscar um ativo..."
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            fontSize: '1rem',
                            border: '1px solid rgba(6, 182, 212, 0.5)',
                            borderRadius: '8px',
                            background: 'rgba(15, 23, 42, 0.6)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            boxSizing: 'border-box',
                            transition: 'all 0.3s ease',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)'}
                    />

                    {showSuggestions && filteredAtivos.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'rgba(15, 23, 42, 0.95)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            borderTop: 'none',
                            borderRadius: '0 0 8px 8px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            zIndex: 10,
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                            marginTop: '0.25rem'
                        }}>
                            {filteredAtivos.map((ativoItem, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleAtivoSelect(ativoItem)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    {ativoItem}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <h3 style={{
                    fontSize: '1.2rem', 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    marginBottom: '2rem',
                    fontWeight: '400'
                }}>
                    Data: <span style={{ color: '#06b6d4', fontWeight: '600' }}>{diaAtual}</span>
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
                                            {evento['data_base']}
                                        </td>
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            color: 'rgba(255, 255, 255, 0.85)', 
                                            verticalAlign: 'middle'
                                        }}>
                                            {evento['data_base']}
                                        </td>
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            color: 'rgba(255, 255, 255, 0.85)', 
                                            verticalAlign: 'middle'
                                        }}>
                                            {evento['data_liquidacao']}
                                        </td>
                                        <td style={{ 
                                            padding: '1rem 1.25rem', 
                                            color: 'rgba(255, 255, 255, 0.85)', 
                                            verticalAlign: 'middle'
                                        }}>
                                            {evento['ativo']}
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
                                                {evento['tipo']}
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
