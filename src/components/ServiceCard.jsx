import React, { useState } from 'react';
import { Sparkles, Info, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ServiceCard({ service, onViewDetails, onBookService }) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback if local image ever fails
  const fallbackImg = "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="service-card-wrapper">
      <div className="service-card">
        {/* Top Image Banner */}
        <div className="card-image-box">
          <img
            src={imgError ? fallbackImg : service.image}
            alt={`${service.name} catering counter by Dream Events`}
            className={`card-image ${isLoaded ? 'loaded' : 'loading'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setImgError(true)}
            loading="lazy"
          />
          <div className="card-image-overlay"></div>

          {/* Category Chip */}
          <span className={`service-category-tag tag-${service.badgeColor || 'gold'}`}>
            {service.category}
          </span>

          {/* Quick Serving Style Pill */}
          <div className="serving-style-badge">
            <Sparkles size={12} />
            <span>{service.servingStyle.split(' ')[0]} Stall</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-content">
          <div className="card-header-info">
            <h3 className="service-card-title">{service.name}</h3>
            <p className="service-tagline-text">{service.tagline}</p>
          </div>

          <p className="service-description">{service.shortDescription}</p>

          {/* Mini Feature Highlights */}
          {service.features && service.features.length > 0 && (
            <div className="service-mini-features">
              <div className="mini-feature-item">
                <CheckCircle2 size={13} className="text-accent" />
                <span>{service.features[0]}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions-grid">
            <button
              type="button"
              className="btn-card-details"
              onClick={() => onViewDetails(service)}
              aria-label={`View details for ${service.name}`}
            >
              <Info size={15} />
              <span>View Details</span>
            </button>

            <button
              type="button"
              className="btn-card-book"
              onClick={() => onBookService(service)}
              aria-label={`Book ${service.name}`}
            >
              <span>Book Service</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .service-card-wrapper {
          position: relative;
          height: 100%;
          border-radius: var(--radius-lg);
          padding: 1px;
          background: rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .service-card-wrapper:hover {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.5) 0%, rgba(255, 46, 147, 0.4) 50%, rgba(123, 44, 191, 0.6) 100%);
          transform: translateY(-8px);
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 215, 0, 0.2);
        }

        .service-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: rgba(26, 10, 56, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: calc(var(--radius-lg) - 1px);
          overflow: hidden;
        }

        .card-image-box {
          position: relative;
          width: 100%;
          height: 230px;
          overflow: hidden;
          background: #120524;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.3s ease;
        }

        .card-image.loading {
          filter: blur(10px);
        }

        .card-image.loaded {
          filter: blur(0);
        }

        .service-card-wrapper:hover .card-image {
          transform: scale(1.08);
        }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(26, 10, 56, 0.85) 100%);
        }

        .service-category-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.725rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        .tag-emerald {
          background: rgba(0, 230, 118, 0.2);
          color: #69F0AE;
          border: 1px solid rgba(0, 230, 118, 0.4);
        }

        .tag-amber, .tag-gold, .tag-yellow {
          background: rgba(255, 215, 0, 0.2);
          color: #FFD54F;
          border: 1px solid rgba(255, 215, 0, 0.4);
        }

        .tag-rose, .tag-pink {
          background: rgba(255, 46, 147, 0.2);
          color: #FF80BF;
          border: 1px solid rgba(255, 46, 147, 0.4);
        }

        .tag-cyan {
          background: rgba(0, 229, 255, 0.2);
          color: #80F4FF;
          border: 1px solid rgba(0, 229, 255, 0.4);
        }

        .tag-purple {
          background: rgba(157, 78, 221, 0.25);
          color: #D8B4FE;
          border: 1px solid rgba(157, 78, 221, 0.45);
        }

        .serving-style-badge {
          position: absolute;
          bottom: 0.85rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.725rem;
          font-weight: 600;
          color: #FFE082;
          background: rgba(15, 5, 33, 0.75);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 215, 0, 0.25);
          z-index: 2;
        }

        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-header-info {
          margin-bottom: 0.75rem;
        }

        .service-card-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
          transition: color 0.2s ease;
        }

        .service-card-wrapper:hover .service-card-title {
          color: #FFD700;
        }

        .service-tagline-text {
          font-size: 0.825rem;
          color: #FFD54F;
          font-weight: 500;
        }

        .service-description {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .service-mini-features {
          margin-bottom: 1.35rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mini-feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .text-accent {
          color: #00E676;
          flex-shrink: 0;
        }

        .card-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: auto;
        }

        .btn-card-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 0.85rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-card-details:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
          color: #FFD700;
        }

        .btn-card-book {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 0.85rem;
          background: var(--gold-gradient);
          border: none;
          border-radius: var(--radius-full);
          color: #1a0833;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 215, 0, 0.25);
          transition: all 0.2s ease;
        }

        .btn-card-book:hover {
          background: var(--gold-gradient-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255, 215, 0, 0.45);
        }

        @media (max-width: 480px) {
          .card-actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
