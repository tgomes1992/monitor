import { useState, useEffect, useMemo } from 'react';
import HeaderText from '../components/HeaderText/index.jsx';
import '../App.css';

function StatusJcot() {
    const [fundos, setFundos] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState('');

    useEffect(() => {
        fetchFundos();
    }, []);

    const fetchFundos = async () => {
        try {
            // TODO: Replace with your actual API endpoint

            const url  = "http://portal-escrituracao:5001/jcothelper/api/status/"

            const response = await fetch(url);
            const data = await response.json();

            setFundos(data);
            setUltimaAtualizacao(new Date().toLocaleString('pt-BR'));
            setUltimaAtualizacao( new Date(data[0].hora_atualizacao).toLocaleString('pt-BR'));



        } catch (error) {
            console.error('Erro ao buscar fundos:', error);
        }
    };

    const filteredFundos = useMemo(() => {
        if (!filterText.trim()) return fundos;
        
        const searchTerm = filterText.toLowerCase();
        return fundos.filter(fundo => 
            fundo.nome_fundo?.toLowerCase().includes(searchTerm) ||
            fundo.cnpj?.toLowerCase().includes(searchTerm) ||
            fundo.cd_fundo?.toLowerCase().includes(searchTerm) ||
            fundo.adm?.toLowerCase().includes(searchTerm) ||
            fundo.tipo_fundo?.toLowerCase().includes(searchTerm)
        );
    }, [fundos, filterText]);

    const handleDownload = (e) => {
        e.preventDefault();
        // TODO: Implement download functionality
        // window.location.href = '/api/downloadfundos';
        console.log('Download arquivo');
    };

    const handleStatusClick = (dataJcot, cdFundo) => {
        // TODO: Implement navigation to status view
        // Example: navigate(`/status-view?data=${dataJcot}&fundo=${cdFundo}`);
        console.log(`Status view: data=${dataJcot}, fundo=${cdFundo}`);
    };

    return (
        <div className="dashboard-wrapper">
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1rem' }}>
                <HeaderText text="Status Jcot" />
                
                <p style={{ 
                    fontSize: '1rem', 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    marginBottom: '0.5rem' 
                }}>
                    Exibe o Papel Cota no JCOT e a sua respectiva data no sistema de Passivo
                </p>

                <p style={{ 
                    fontSize: '0.95rem', 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    marginBottom: '2rem' 
                }}>
                    Atualizado em: <b style={{ color: '#06b6d4' }}>{ultimaAtualizacao}</b>
                </p>

                <form onSubmit={handleDownload} style={{ 
                    marginBottom: '2rem', 
                    display: 'flex', 
                    gap: '1.5rem', 
                    alignItems: 'flex-end',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
                        <label 
                            htmlFor="filtropapelcota" 
                            style={{ 
                                display: 'block', 
                                marginBottom: '0.5rem', 
                                fontSize: '0.9rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontWeight: '500'
                            }}
                        >
                            Filtro
                        </label>
                        <input 
                            type="text" 
                            id="filtropapelcota"
                            className="form-control"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            placeholder="Buscar por fundo, CNPJ, código..."
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                                color: '#ffffff',
                                fontSize: '0.95rem',
                                height: '44px'
                            }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn"
                        style={{
                            padding: '0.75rem 2rem',
                            background: '#64748b',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            height: '44px',
                            alignSelf: 'flex-end'
                        }}
                    >
                        Baixar Arquivo
                    </button>
                </form>

                <div style={{ 
                    overflowX: 'auto', 
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <table className="table table-striped" style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse',
                        fontSize: '0.9rem'
                    }}>
                        <thead>
                            <tr style={{ 
                                background: 'rgba(6, 182, 212, 0.1)',
                                borderBottom: '2px solid rgba(6, 182, 212, 0.3)'
                            }}>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fundo</th>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CNPJ</th>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Código</th>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Administrador</th>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tipo Fundo</th>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Data - Jcot</th>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bloqueio - Amplis</th>
                                <th style={{ padding: '1rem 1.25rem', textAlign: 'center', color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFundos.map((fundo, index) => (
                                <tr 
                                    key={index} 
                                    className="detalhes"
                                    style={{ 
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}
                                >
                                    <td style={{ padding: '1rem 1.25rem', color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'middle' }}>
                                        {fundo.nome_fundo}
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem', color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'middle' }}>
                                        {fundo.cnpj}
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem', color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'middle' }}>
                                        {fundo.cd_fundo}
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem', color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'middle' }}>
                                        {fundo.adm}
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem', color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'middle' }}>
                                        {fundo.tipo_fundo}
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem', color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'middle' }}>
                                        {fundo.data_jcot}
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem', color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'middle' }}>
                                        {fundo.bloqueio_amplis}
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem', textAlign: 'center', verticalAlign: 'middle' }}>
                                        <button 
                                            onClick={() => handleStatusClick(fundo.data_jcot, fundo.cd_fundo)}
                                            className="btn"
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: '#64748b',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            Status Jcot
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredFundos.length === 0 && (
                    <p style={{ 
                        textAlign: 'center', 
                        padding: '2rem', 
                        color: 'rgba(255, 255, 255, 0.5)' 
                    }}>
                        Nenhum fundo encontrado
                    </p>
                )}
            </div>
        </div>
    );
}

export default StatusJcot;
