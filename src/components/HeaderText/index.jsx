import React from 'react';

function HeaderText({ text }) {
    return (
        <header className="header-text-section slide-down">
            <div className="header-title-container">
                {/* The "Pipe" accent with Materialize-style glow */}
                <div className="header-accent">
                    <span className="cyan-text text-accent-3 accent-pipe">|</span>
                    <span className="accent-pipe-glow">|</span>
                </div>

                <h1 className="header-main-text white-text">
                    {text}
                </h1>
            </div>

            {/* Materialize-integrated Gradient Line */}
            <div className="header-line-wrapper">
                <div className="header-line-glow cyan accent-3"></div>
                <div className="header-line cyan accent-3"></div>
            </div>

            {/* Decorative Dots using Materialize color classes */}
            <div className="header-dots">
                <div className="dot cyan accent-3 pulse-anim"></div>
                <div className="dot cyan accent-2 pulse-anim delay-1"></div>
                <div className="dot cyan darken-3 pulse-anim delay-2"></div>
            </div>
        </header>
    );
}

export default HeaderText;