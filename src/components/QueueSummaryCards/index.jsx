import React, { useMemo } from 'react';
import HeaderCard from '../HeaderCard';

const COLORS = ['#06b6d4', '#27ae60', '#f39c12', '#e74c3c', '#8b5cf6', '#3b82f6', '#14b8a6', '#ec4899'];

function QueueSummaryCards({ queues = [] }) {
  const displayQueues = useMemo(() => {
    return (queues || [])
      .filter(q => typeof q?.name === 'string' && !q.name.startsWith('celeryev.'))
      .map(q => ({ name: q.name, messages: q.messages || 0 }));
  }, [queues]);

  if (!displayQueues.length) {
    return (
      <div className="row">
        <div className="col s12">
          <p style={{ opacity: 0.7 }}>Nenhuma fila para exibir.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {displayQueues.map((q, idx) => (
        <div key={q.name} className="col s12 m6 l3">
          <HeaderCard
            label={q.name}
            value={q.messages}
            description="Mensagens na fila"
            color={COLORS[idx % COLORS.length]}
          />
        </div>
      ))}
    </div>
  );
}

export default QueueSummaryCards;

