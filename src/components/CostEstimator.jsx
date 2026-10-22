import React, { useState } from 'react';
import { Calculator, Check, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';

export default function CostEstimator({ onBookCustomPackage }) {
  const [selectedServices, setSelectedServices] = useState([
    'Chocolate Fountain',
    'Fruit Salad',
    'Welcome Drinks',
    'Ice Cream'
  ]);
  const [guestCount, setGuestCount] = useState('150 - 300 Guests');

  const handleToggle = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== serviceName));
      }
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const guestRanges = [
    '50 - 100 Guests',
    '150 - 300 Guests',
    '300 - 600 Guests',
    '600+ Mega Event'
  ];

  return (
    <section className="estimator-section section-padding">
      <div className="container">
        <div className="estimator-card glass-panel">
          <div className="estimator-header">
            <div className="estimator-badge">
              <Calculator size={15} />
              <span>Interactive Package Planner</span>
            </div>
            <h3 className="estimator-title">
              Customize Your <span className="text-gold-gradient">Celebration Food Stalls</span>
            </h3>
            <p className="estimator-desc">
              Select your expected guest size and choose your favorite live counters to assemble a personalized celebration package.
            </p>
          </div>

          <div className="estimator-grid">
            {/* Left: Guest Range Selection & Service Checkbox toggles */}
            <div className="estimator-controls">
              <div className="control-group">
                <label className="control-label">1. Select Estimated Guest Count:</label>
                <div className="guest-pills">
                  {guestRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      className={`guest-pill ${guestCount === range ? 'active' : ''}`}
                      onClick={() => setGuestCount(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">2. Select Your Live Counter Treats:</label>
                <div className="services-selector-grid">
                  {SERVICES_DATA.map((service) => {
                    const isSelected = selectedServices.includes(service.name);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        className={`service-select-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleToggle(service.name)}
                      >
                        <div className="btn-check">
                          {isSelected && <Check size={14} />}
                        </div>
                        <span className="btn-name">{service.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Package Summary Display */}
            <div className="estimator-summary-box">
              <div className="summary-card-inner">
                <span className="summary-eyebrow text-gold">Package Blueprint</span>
                <h4 className="summary-title">Dream Celebration Combo</h4>
                
                <div className="summary-metrics">
                  <div className="metric-item">
                    <span className="metric-label">Guest Scale</span>
                    <strong className="metric-val">{guestCount}</strong>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Stalls Selected</span>
                    <strong className="metric-val text-gold">{selectedServices.length} Counters</strong>
                  </div>
                </div>

                <div className="selected-items-list">
                  <span className="items-title">Included Counters:</span>
                  <ul>
                    {selectedServices.map((name, idx) => (
                      <li key={idx} className="item-row">
                        <CheckCircle2 size={15} className="text-green" />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="package-includes-note">
                  <span>✨ Includes uniformed attendants, table lighting & complete setup in Villupuram.</span>
                </div>

                <button
                  type="button"
                  className="btn btn-primary-gold w-full book-combo-btn"
                  onClick={() => onBookCustomPackage({
                    guests: guestCount,
                    services: selectedServices
                  })}
                >
                  <Sparkles size={16} />
                  <span>Enquire For This Package</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .estimator-section {
          padding-top: 2rem;
          padding-bottom: 5rem;
        }

        .estimator-card {
          padding: 3rem 2.5rem;
          background: rgba(20, 8, 44, 0.85);
          border: 1px solid rgba(255, 215, 0, 0.25);
        }

        @media (max-width: 768px) {
          .estimator-card {
            padding: 2rem 1.5rem;
          }
        }

        .estimator-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 2.5rem auto;
        }

        .estimator-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFD700;
          background: rgba(255, 215, 0, 0.12);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 215, 0, 0.3);
          margin-bottom: 0.85rem;
        }

        .estimator-title {
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 0.65rem;
        }

        .estimator-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .estimator-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        @media (max-width: 960px) {
          .estimator-grid {
            grid-template-columns: 1fr;
          }
        }

        .estimator-controls {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .control-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .guest-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .guest-pill {
          padding: 0.6rem 1.15rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .guest-pill:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        .guest-pill.active {
          background: var(--gold-gradient);
          color: #1a0833;
          border-color: transparent;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(255, 215, 0, 0.3);
        }

        .services-selector-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        @media (max-width: 500px) {
          .services-selector-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-select-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(12, 3, 27, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: #FFFFFF;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .service-select-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 215, 0, 0.3);
        }

        .service-select-btn.selected {
          background: rgba(255, 215, 0, 0.12);
          border-color: #FFD700;
        }

        .btn-check {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFD700;
          flex-shrink: 0;
        }

        .service-select-btn.selected .btn-check {
          border-color: #FFD700;
          background: rgba(255, 215, 0, 0.25);
        }

        /* Summary Box */
        .estimator-summary-box {
          background: rgba(13, 3, 30, 0.9);
          border: 1px solid rgba(255, 215, 0, 0.35);
          border-radius: var(--radius-lg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
        }

        .summary-card-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .summary-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }

        .summary-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1.5rem;
        }

        .summary-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.25rem;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .metric-val {
          font-size: 1rem;
          color: #FFFFFF;
          margin-top: 0.25rem;
        }

        .selected-items-list {
          flex-grow: 1;
          margin-bottom: 1.5rem;
        }

        .items-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.65rem;
        }

        .selected-items-list ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .item-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #FFFFFF;
        }

        .package-includes-note {
          font-size: 0.8rem;
          color: #FFD54F;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }

        .book-combo-btn {
          margin-top: auto;
          padding: 0.9rem 1.5rem;
        }

        .text-green { color: #00E676; }
        .text-gold { color: #FFD700; }
        .w-full { width: 100%; }
      `}</style>
    </section>
  );
}
