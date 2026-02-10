import React from 'react';

function HeaderCard({ label, value, description, color = "#06b6d4" }) {
    // Map hex to Materialize color classes
    const colorMap = {
        '#06b6d4': 'cyan darken-1',
        '#e74c3c': 'red darken-1',
        '#27ae60': 'green darken-1',
        '#f39c12': 'orange darken-2',
    };

    const bgColor = colorMap[color] || 'cyan darken-1';

    return (
        <div className="header-card-wrapper">
            <div className={`card-panel ${bgColor} z-depth-3 hoverable custom-header-card`}>
                {/* Glass & Glow Decorative Elements */}
                <div className="card-glow-accent"></div>
                <div className="card-glass-overlay"></div>

                <div className="card-content-wrapper">
          <span className="card-label white-text">
            {label}
          </span>

                    <div className="card-value-container">
                        <h2 className="card-value white-text">
                            {value}
                        </h2>
                    </div>

                    <p className="card-description white-text">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HeaderCard;