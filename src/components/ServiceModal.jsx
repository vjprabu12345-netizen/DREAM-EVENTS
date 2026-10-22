import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Check, Clock, Users, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function ServiceModal({ service, onClose, onBookService }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Auto focus close button for accessibility
    closeBtnRef.current?.focus();
    
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!service) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
    >
      <div className="modal-container modal-content-animated" ref={modalRef}>
        {/* Close Button */}
        <button 
          ref={closeBtnRef}
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close service details"
        >
          <X size={22} />
        </button>

        <div className="modal-grid">
          {/* Left Column: Image & Highlights */}
          <div className="modal-image-col">
            <div className="modal-img-wrap">
              <img 
                src={service.image} 
                alt={`${service.name} event catering display`}
                className="modal-img" 
              />
              <div className="modal-img-gradient"></div>
              <span className={`modal-badge tag-${service.badgeColor || 'gold'}`}>
                {service.category}
              </span>
            </div>

            <div className="modal-quick-meta">
              <div className="meta-card">
                <Users size={16} className="text-gold" />
                <div>
                  <span className="meta-label">Serving Style</span>
                  <strong className="meta-value">{service.servingStyle}</strong>
                </div>
              </div>
              <div className="meta-card">
                <Clock size={16} className="text-pink" />
                <div>
                  <span className="meta-label">Counter Setup</span>
                  <strong className="meta-value">Live Attended Station</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Actions */}
          <div className="modal-content-col">
            <div className="modal-header">
              <span className="modal-eyebrow text-gold-gradient">Signature Live Counter</span>
              <h2 id="modal-service-title" className="modal-title">{service.name}</h2>
              <p className="modal-tagline">{service.tagline}</p>
            </div>

            <div className="modal-body-scroll">
              <p className="modal-description">{service.detailedDescription}</p>

              {/* Service Features */}
              {service.features && (
                <div className="modal-features-section">
                  <h4 className="features-title">
                    <Sparkles size={16} className="text-gold" />
                    <span>Included in this Service</span>
                  </h4>
                  <ul className="features-list">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <div className="feature-bullet">
                          <Check size={14} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Popular For Tags */}
              {service.popularFor && (
                <div className="modal-tags-section">
                  <span className="tags-label">Recommended for:</span>
                  <div className="tags-wrap">
                    {service.popularFor.map((item, idx) => (
                      <span key={idx} className="popular-tag">{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-primary-gold w-full"
                onClick={() => {
                  onClose();
                  onBookService(service);
                }}
              >
                <span>Book This Service Now</span>
                <ArrowRight size={18} />
              </button>

              <div className="modal-quick-contact">
                <a 
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(service.name)}%20live%20counter.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-contact-link wa"
                >
                  <MessageSquare size={14} />
                  <span>Ask on WhatsApp</span>
                </a>
                <a 
                  href={`tel:${BUSINESS_INFO.primaryPhone}`}
                  className="quick-contact-link call"
                >
                  <Phone size={14} />
                  <span>Call {BUSINESS_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-container {
          position: relative;
          background: #190938;
          border: 1px solid rgba(255, 215, 0, 0.35);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.15);
        }

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(12, 3, 27, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: #FF2E93;
          border-color: #FF2E93;
          transform: rotate(90deg);
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          height: 100%;
          max-height: 90vh;
        }

        @media (max-width: 820px) {
          .modal-grid {
            grid-template-columns: 1fr;
            overflow-y: auto;
          }
        }

        .modal-image-col {
          display: flex;
          flex-direction: column;
          background: #110526;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-img-wrap {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
        }

        @media (max-width: 820px) {
          .modal-img-wrap {
            height: 220px;
          }
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(17, 5, 38, 0.9) 100%);
        }

        .modal-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          backdrop-filter: blur(8px);
        }

        .modal-quick-meta {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
        }

        .meta-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
        }

        .meta-label {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .meta-value {
          font-size: 0.85rem;
          color: #FFFFFF;
        }

        .modal-content-col {
          display: flex;
          flex-direction: column;
          padding: 2.25rem 2rem 2rem 2rem;
          overflow-y: auto;
        }

        .modal-header {
          margin-bottom: 1.25rem;
        }

        .modal-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
          display: block;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }

        .modal-tagline {
          font-size: 0.95rem;
          color: #FFD54F;
          font-weight: 600;
        }

        .modal-body-scroll {
          flex-grow: 1;
          margin-bottom: 1.5rem;
        }

        .modal-description {
          font-size: 0.96rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.5rem;
        }

        .modal-features-section {
          margin-bottom: 1.5rem;
        }

        .features-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.85rem;
        }

        .features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .feature-bullet {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(0, 230, 118, 0.2);
          color: #00E676;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .modal-tags-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tags-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .popular-tag {
          font-size: 0.78rem;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FFE082;
        }

        .modal-footer {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-quick-contact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .quick-contact-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .quick-contact-link.wa {
          color: #25D366;
        }

        .quick-contact-link.call {
          color: #FFD700;
        }

        .w-full {
          width: 100%;
        }

        .text-gold { color: #FFD700; }
        .text-pink { color: #FF2E93; }
      `}</style>
    </div>
  );
}
