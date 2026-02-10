import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import HeaderCard from './components/HeaderCard'
import BaseFundo from './components/BaseFundo'
import HeaderText from './components/HeaderText'
import Pagination from './components/Pagination'
import './App.css'

const CARDS_PER_PAGE = 24;
const REFRESH_INTERVAL = 60;
const COLORS = ['#06b6d4', '#e74c3c', '#27ae60', '#f39c12', '#8b5cf6', '#ec4899', '#14b8a6', '#3b82f6'];


const generateTestData = () => {
    const cards = [];

    const random = Math.random() * (1000-1)+ 1;

    for (let i = 1; i <= random; i++) {
        const fundCode = Math.floor(1000 + Math.random() * 9000);
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const year = 2024 + Math.floor(Math.random() * 2);

        cards.push({
            cd_fundo: fundCode.toString(),
            data_jcot: `${day}/${month}/${year}`,
            data_amplis: `${day}/${month}/${year}`
        });
    }
    return cards;
};

// Replace with your real API call — same contract: returns an array of cards
const fetchNextData = async () => {
    await new Promise((res) => setTimeout(res, 300));
    return generateTestData();
};

// Compute stable stats from a fixed dataset (no random inside render)
const computeStats = (cards) => ({
    total:     cards.length,
    active:    Math.floor(cards.length * 0.85),
    urgent:    Math.floor(Math.random() * 150),   // replace with real field
    completed: Math.floor(cards.length * 0.78),
    pending:   Math.floor(Math.random() * 300),   // replace with real field
});


function App() {
    // ─── STATE ───────────────────────────────────────────────────────────────
    // `liveCards`    → what is actually rendered on screen (never cleared)
    // `stagedCards`  → freshly fetched batch waiting to go live
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
    const [liveCards,   setLiveCards]   = useState(() => generateTestData());
    const [stagedCards, setStagedCards] = useState(null);          // null = no pending batch

    const [currentPage,     setCurrentPage]     = useState(1);
    const [secondsToUpdate, setSecondsToUpdate] = useState(REFRESH_INTERVAL);
    const [isRefreshing,    setIsRefreshing]     = useState(false);

    // Prevent overlapping fetches
    const refreshInFlightRef = useRef(false);

    // ─── STATS — computed once per live dataset ───────────────────────────────
    const stats = useMemo(() => computeStats(liveCards), [liveCards]);

    // ─── COUNTDOWN TIMER ─────────────────────────────────────────────────────
    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsToUpdate((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // ─── FETCH TRIGGER — fires when timer hits 0 ─────────────────────────────
    useEffect(() => {
        if (secondsToUpdate !== 0 || refreshInFlightRef.current) return;

        refreshInFlightRef.current = true;
        setIsRefreshing(true);

        (async () => {
            try {
                const nextData = await fetchNextData();
                setStagedCards(nextData);
            } catch (err) {
                console.error('[App] Refresh failed:', err);
            } finally {
                refreshInFlightRef.current = false;         // ← FIX: limpa ANTES do setState
                setIsRefreshing(false);
                setSecondsToUpdate(REFRESH_INTERVAL);
            }
        })();
    }, [secondsToUpdate]);

    // ─── COMMIT STAGED DATA ───────────────────────────────────────────────────
    // `stagedCards` is set only after a successful fetch.
    // We promote it to `liveCards` in a separate effect so the
    // swap happens cleanly after React has batched all state updates.
    useEffect(() => {
        if (!stagedCards) return;

        setLiveCards(stagedCards);
        setLastUpdated(new Date().toLocaleTimeString());

        const totalPagesNext = Math.ceil(stagedCards.length / CARDS_PER_PAGE);
        setCurrentPage((prev) => Math.min(prev, Math.max(1, totalPagesNext)));

        setStagedCards(null); // ← FIX: descomentado — limpa o stage após promover
    }, [stagedCards]);

    // ─── DERIVED DATA ─────────────────────────────────────────────────────────
    const totalPages = Math.ceil(liveCards.length / CARDS_PER_PAGE);

    const currentCards = useMemo(() => {
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        return liveCards.slice(startIndex, startIndex + CARDS_PER_PAGE);
    }, [liveCards, currentPage]);

    // ─── HANDLERS ────────────────────────────────────────────────────────────
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // ─── RENDER ───────────────────────────────────────────────────────────────
    return (
        <div className="dashboard-wrapper">

            {/* Progress bar: full when idle, drains as countdown runs */}
            <div className="refresh-bar-container">
                <div
                    className="refresh-bar-fill"
                    style={{
                        width: `${(secondsToUpdate / REFRESH_INTERVAL) * 100}%`,
                        backgroundColor: isRefreshing ? '#27ae60' : '#00e5ff',
                        transition: isRefreshing ? 'background-color 0.3s' : 'width 1s linear, background-color 0.3s',
                    }}
                />
            </div>

            <div className="container">
                <div className="row section-header">
                    <div className="col s12 center-align">
                        <HeaderText text="Monitor Processamento" />
                        <div className="live-indicator">
                            <span className={`dot ${isRefreshing ? 'syncing' : 'pulse'}`}/>
                            {isRefreshing
                                ? 'SINCRONIZANDO...'
                                : `LIVE • ATUALIZAÇÃO EM ${secondsToUpdate}s`}
                            <span className="last-updated" style={{opacity: 0.7, fontSize: '0.85rem'}}>
                                | ÚLTIMA ATUALIZAÇÃO: {lastUpdated}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="row">
                <div className="col s12 m6 l3">
                        <HeaderCard label="Total"      value={stats.total.toLocaleString()} description="Fundos Ativos"  color="#06b6d4" />
                    </div>
                    <div className="col s12 m6 l3">
                        <HeaderCard label="Urgente"    value={stats.urgent}                 description="Requerem Ação"  color="#e74c3c" />
                    </div>
                    <div className="col s12 m6 l3">
                        <HeaderCard label="Completado" value={stats.completed}              description="Últimas 24h"    color="#27ae60" />
                    </div>
                    <div className="col s12 m6 l3">
                        <HeaderCard label="Fila"       value={stats.pending}                description="Aguardando"     color="#f39c12" />
                    </div>
                </div>

                <div className="divider-gradient" />

                {/* Cards — always rendered from liveCards; never blank during refresh */}
                <div className={`row${isRefreshing ? ' is-refreshing' : ''}`}>
                    {currentCards.map((card, index) => (
                        <div key={`${card.cd_fundo}-${index}`} className="col s6 m4 l3 xl2">
                            <BaseFundo data={card} color={COLORS[index % COLORS.length]} />
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-footer z-depth-5">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            cardsPerPage={CARDS_PER_PAGE}
                            totalCards={liveCards.length}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;