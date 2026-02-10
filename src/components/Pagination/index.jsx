import React, { useState } from 'react';

function Pagination({ currentPage, totalPages, cardsPerPage = 20, totalCards = 1000, onPageChange }) {
  const [inputPage, setInputPage] = useState('');

  const handlePrevious = () => { if (currentPage > 1) onPageChange(currentPage - 1); };
  const handleNext = () => { if (currentPage < totalPages) onPageChange(currentPage + 1); };
  const handleGoToPage = () => {
    const page = parseInt(inputPage, 10);
    if (page > 0 && page <= totalPages) { onPageChange(page); setInputPage(''); }
  };
  const handleKeyPress = (e) => { if (e.key === 'Enter') { handleGoToPage(); } };

  const getPageNumbers = () => {
    const pages = []; const maxVisible = 7;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) { start = Math.max(1, end - maxVisible + 1); }
    if (start > 1) { pages.push(1); if (start > 2) pages.push('...'); }
    for (let i = start; i <= end; i++) { pages.push(i); }
    if (end < totalPages) { if (end < totalPages - 1) pages.push('...'); pages.push(totalPages); }
    return pages;
  };

  return (
    <div className="section">
      {/* Main Navigation */}
      <div className="row center-align">
        <div className="col s12">
          <a onClick={handlePrevious} className={`waves-effect btn ${currentPage === 1 ? 'disabled' : 'cyan darken-2'}`}>
            <i className="material-icons left">chevron_left</i> Anterior
          </a>

          <ul className="pagination">
            <li className={`waves-effect ${currentPage === 1 ? 'disabled' : ''}`}>
              <a onClick={handlePrevious}><i className="material-icons">chevron_left</i></a>
            </li>
            {getPageNumbers().map((page, idx) => (
              <li key={idx} className={`${page === currentPage ? 'active cyan darken-2' : (page === '...' ? 'disabled' : 'waves-effect')}`}>
                {page === '...' ? (
                  <a>...</a>
                ) : (
                  <a onClick={() => onPageChange(page)}>{page}</a>
                )}
              </li>
            ))}
            <li className={`waves-effect ${currentPage === totalPages ? 'disabled' : ''}`}>
              <a onClick={handleNext}><i className="material-icons">chevron_right</i></a>
            </li>
          </ul>

          <a onClick={handleNext} className={`waves-effect btn ${currentPage === totalPages ? 'disabled' : 'cyan darken-2'}`}>
            Próxima <i className="material-icons right">chevron_right</i>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-gradient"></div>

      {/* Secondary Info and Quick Jump */}
      <div className="row">
        <div className="col s12 m8">
          <div className="grey-text text-lighten-1">
            Página <span className="cyan-text text-accent-3">{currentPage}</span> de <span className="white-text">{totalPages}</span>
            <span className="grey-text"> • {cardsPerPage} por página • Total: <span className="cyan-text text-accent-3">{totalCards}</span></span>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="input-field">
            <input id="goto" type="number" min="1" max={totalPages} value={inputPage} onChange={(e) => setInputPage(e.target.value)} onKeyDown={handleKeyPress} />
            <label htmlFor="goto" className="active grey-text text-lighten-1">Ir para página</label>
          </div>
          <a onClick={handleGoToPage} className={`waves-effect btn ${!inputPage ? 'disabled' : 'cyan darken-2'}`}>Ir</a>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

