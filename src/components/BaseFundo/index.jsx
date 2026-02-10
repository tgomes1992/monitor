import React, { useState, useEffect } from 'react';

const BaseFundo = ({ color = "#06b6d4", data = { cd_fundo: "1944", data_jcot: "01/01/2025", data_amplis: "01/01/2025" } }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 600);
    return () => clearTimeout(timer);
  }, [data.cd_fundo]);

  const handleDestroy = () => {
    setIsPopping(true);
    setTimeout(() => {
      setIsDestroyed(true);
    }, 300);
  };

  if (isDestroyed) return null;

  // Mapping hex colors to Materialize Color Classes
  const colorMap = {
    '#06b6d4': 'cyan darken-1',
    '#e74c3c': 'red darken-1',
    '#27ae60': 'green darken-1',
    '#f39c12': 'orange darken-2',
    '#8b5cf6': 'deep-purple accent-2',
    '#ec4899': 'pink accent-3',
    '#14b8a6': 'teal darken-1',
    '#3b82f6': 'blue darken-1',
  };

  const bgClass = colorMap[color] || 'cyan darken-1';

  return (
      <div
          className={`base-fundo-wrapper ${isPopping ? 'popping' : ''} ${isUpdating ? 'updating' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleDestroy}
      >
        <div
            className={`card ${bgClass} z-depth-2 hoverable custom-card-style`}
            style={{
              transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'scale(1)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
        >
          <div className="card-content white-text">
            {/* Glass Overlay effect via CSS */}
            <div className="glass-shine"></div>

            {/* Fundo Row */}
            <div className="info-row">
              <span className="info-label">Fundo</span>
              <span className="info-value truncate">{data.cd_fundo}</span>
            </div>

            {/* Jcot Row */}
            <div className="info-row">
              <span className="info-label">Jcot</span>
              <span className="info-value">{data.data_jcot}</span>
            </div>

            {/* Amplis Row */}
            <div className="info-row">
              <span className="info-label">Amplis</span>
              <span className="info-value">{data.data_amplis}</span>
            </div>
          </div>

          {/* Delete Overlay */}
          {isHovered && (
              <div className="card-reveal-hint center-align">
                <p className="white-text uppercase">Remover</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default BaseFundo;