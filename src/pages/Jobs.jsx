import { useState, useEffect } from 'react';
import HeaderText from '../components/HeaderText/index.jsx';
import '../App.css';

const ITEMS_PER_PAGE = 20;

function Jobs() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchJobs(currentPage);
    }, [currentPage]);

    const fetchJobs = async (page) => {
        try {
            // TODO: Replace with your actual API endpoint
            // const response = await fetch(`/api/jobs?page=${page}`);
            // const data = await response.json();
            
            // Mock data for demonstration
            const mockData = Array.from({ length: 100 }, (_, i) => ({
                name: `Rotina ${i + 1}`,
                result: i % 3 === 0 ? 'Success' : i % 3 === 1 ? 'Failed' : 'Pending',
                date_done: new Date(Date.now() - Math.random() * 86400000).toLocaleString('pt-BR')
            }));
            
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedData = mockData.slice(startIndex, endIndex);
            
            setTasks(paginatedData);
            setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Erro ao buscar jobs:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    const getResultStyle = (result) => {
        const baseStyle = {
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: '500',
            display: 'inline-block'
        };

        if (result === 'Success') {
            return { ...baseStyle, background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' };
        } else if (result === 'Failed') {
            return { ...baseStyle, background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
        } else {
            return { ...baseStyle, background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' };
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1rem' }}>
                <HeaderText text="Jobs" />
                
                <div style={{ 
                    overflowX: 'auto', 
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginBottom: '2rem'
                }}>
                    <table className="table table-bordered" style={{ 
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
                                    letterSpacing: '0.5px',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    Rotina
                                </th>
                                <th style={{ 
                                    padding: '1rem 1.25rem', 
                                    textAlign: 'left', 
                                    color: '#06b6d4', 
                                    fontWeight: '600', 
                                    fontSize: '0.85rem', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    Resultado
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
                                    Hora Término
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr 
                                    key={index}
                                    style={{ 
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}
                                >
                                    <td style={{ 
                                        padding: '1rem 1.25rem', 
                                        color: 'rgba(255, 255, 255, 0.85)', 
                                        verticalAlign: 'middle',
                                        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        {task.name}
                                    </td>
                                    <td style={{ 
                                        padding: '1rem 1.25rem', 
                                        verticalAlign: 'middle',
                                        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        <span style={getResultStyle(task.result)}>
                                            {task.result}
                                        </span>
                                    </td>
                                    <td style={{ 
                                        padding: '1rem 1.25rem', 
                                        color: 'rgba(255, 255, 255, 0.85)', 
                                        verticalAlign: 'middle'
                                    }}>
                                        {task.date_done}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <nav aria-label="Page navigation" style={{ marginBottom: '2rem' }}>
                    <ul style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        gap: '0.5rem',
                        listStyle: 'none',
                        padding: 0,
                        flexWrap: 'wrap'
                    }}>
                        {/* First Page */}
                        {currentPage > 1 && (
                            <>
                                <li>
                                    <button 
                                        onClick={() => handlePageChange(1)}
                                        aria-label="First"
                                        style={{
                                            padding: '0.5rem 0.75rem',
                                            background: 'rgba(30, 41, 59, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '6px',
                                            color: '#ffffff',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        &laquo;&laquo;
                                    </button>
                                </li>
                                {/* Previous */}
                                <li>
                                    <button 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        aria-label="Previous"
                                        style={{
                                            padding: '0.5rem 0.75rem',
                                            background: 'rgba(30, 41, 59, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '6px',
                                            color: '#ffffff',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        &laquo;
                                    </button>
                                </li>
                            </>
                        )}

                        {/* Page Numbers */}
                        {getPageNumbers().map((num) => (
                            <li key={num}>
                                <button 
                                    onClick={() => handlePageChange(num)}
                                    style={{
                                        padding: '0.5rem 0.75rem',
                                        minWidth: '40px',
                                        background: num === currentPage 
                                            ? '#06b6d4' 
                                            : 'rgba(30, 41, 59, 0.6)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '6px',
                                        color: '#ffffff',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: num === currentPage ? '600' : '400',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {num}
                                </button>
                            </li>
                        ))}

                        {/* Next & Last */}
                        {currentPage < totalPages && (
                            <>
                                {/* Next */}
                                <li>
                                    <button 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        aria-label="Next"
                                        style={{
                                            padding: '0.5rem 0.75rem',
                                            background: 'rgba(30, 41, 59, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '6px',
                                            color: '#ffffff',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        &raquo;
                                    </button>
                                </li>
                                {/* Last Page */}
                                <li>
                                    <button 
                                        onClick={() => handlePageChange(totalPages)}
                                        aria-label="Last"
                                        style={{
                                            padding: '0.5rem 0.75rem',
                                            background: 'rgba(30, 41, 59, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '6px',
                                            color: '#ffffff',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        &raquo;&raquo;
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* Page Info */}
                <div style={{ 
                    textAlign: 'center', 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.9rem'
                }}>
                    Página <span style={{ color: '#06b6d4', fontWeight: '600' }}>{currentPage}</span> de <span style={{ color: '#ffffff' }}>{totalPages}</span>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
