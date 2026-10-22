import React from 'react';
import { Sparkles, ArrowRight, Utensils, Star, ShieldCheck, MapPin } from 'lucide-react';

export default function Hero({ onBookEventClick, onExploreServicesClick }) {
  return (
    <section id="home" className="hero-section">
      {/* Background Ambience Layers */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="hero-glow hero-glow-3"></div>

      <div className="container hero-container">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="hero-content">
          {/* Top Pill */}
          <div className="badge-pill badge-gold hero-badge">
            <Sparkles size={14} className="text-gold" />
            <span>Villupuram's Premier Event Catering & Live Counters</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            <span className="hero-brand-name">DREAM EVENTS</span>
            <span className="hero-tagline text-gold-gradient">Make Every Moment Special</span>
          </h1>

          {/* Supporting Text */}
          <p className="hero-subtitle">
            Creating unforgettable celebrations with delicious treats, refreshing drinks, and delightful experiences.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary-gold hero-btn"
              onClick={onBookEventClick}
            >
              <Sparkles size={18} />
              <span>Book Your Event</span>
            </button>

            <button 
              type="button" 
              className="btn btn-outline-gold hero-btn"
              onClick={onExploreServicesClick}
            >
              <span>Explore Our Services</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Feature Highlights Trust Row */}
          <div className="hero-trust-row">
            <div className="trust-item">
              <div className="trust-icon-wrap icon-green">
                <ShieldCheck size={18} />
              </div>
              <div className="trust-text">
                <strong>100% Fresh</strong>
                <span>Hygienic Ingredients</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-wrap icon-pink">
                <Utensils size={18} />
              </div>
              <div className="trust-text">
                <strong>7+ Live Counters</strong>
                <span>Interactive Stalls</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-wrap icon-cyan">
                <MapPin size={18} />
              </div>
              <div className="trust-text">
                <strong>Villupuram</strong>
                <span>& Nearby Districts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase Card */}
        <div className="hero-visual">
          <div className="visual-card-wrapper">
            {/* Ambient Border Glow */}
            <div className="card-ambient-glow"></div>

            <div className="visual-card">
              <div className="hero-image-wrapper">
                <img 
                  src="/images/hero-banner.jpg" 
                  alt="Dream Events luxury catering counters and celebratory banquet display"
                  className="hero-main-img"
                  loading="eager"
                />
                <div className="hero-image-gradient"></div>

                {/* Floating Badge 1: Top Right */}
                <div className="floating-chip chip-top animate-float">
                  <div className="chip-icon-box chip-gold">
                    <Star size={16} fill="#FFD700" color="#FFD700" />
                  </div>
                  <div className="chip-text">
                    <span className="chip-bold">Signature Displays</span>
                    <span className="chip-sub">Weddings & Birthdays</span>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Left */}
                <div className="floating-chip chip-bottom">
                  <div className="chip-icon-box chip-pink">
                    <Sparkles size={16} color="#FF2E93" />
                  </div>
                  <div className="chip-text">
                    <span className="chip-bold">Live Food Stalls</span>
                    <span className="chip-sub">Chocolate Fountain & Treats</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Ticker */}
              <div className="hero-card-footer">
                <div className="quick-service-tags">
                  <span className="tag-dot">✦ Fruit Salad</span>
                  <span className="tag-dot">✦ Chocolate Fountain</span>
                  <span className="tag-dot">✦ Sweet Beeda</span>
                  <span className="tag-dot">✦ Mocktails</span>
                  <span className="tag-dot">✦ Ice Cream</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding-top: 4.5rem;
          padding-bottom: 5.5rem;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 2.5rem;
            padding-bottom: 3.5rem;
          }
        }

        /* Ambient Glow Spheres */
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        }

        .hero-glow-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #7B2CBF, transparent 70%);
          top: -100px;
          left: -150px;
        }

        .hero-glow-2 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.25), transparent 70%);
          top: 30%;
          right: -100px;
        }

        .hero-glow-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #FF2E93, transparent 70%);
          bottom: -80px;
          left: 30%;
          opacity: 0.25;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        @media (max-width: 992px) {
          .hero-content {
            align-items: center;
          }
        }

        .hero-badge {
          margin-bottom: 1.25rem;
          box-shadow: 0 4px 16px rgba(255, 215, 0, 0.15);
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1.25rem;
        }

        .hero-brand-name {
          font-size: clamp(2.5rem, 5.5vw, 4.25rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          line-height: 1.05;
          text-shadow: 0 4px 25px rgba(123, 44, 191, 0.6);
        }

        .hero-tagline {
          font-size: clamp(1.6rem, 3.2vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.18rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2.25rem;
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1.1rem;
          margin-bottom: 2.75rem;
        }

        @media (max-width: 992px) {
          .hero-actions {
            justify-content: center;
          }
        }

        .hero-btn {
          padding: 0.95rem 1.85rem;
          font-size: 1rem;
        }

        .hero-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
        }

        @media (max-width: 992px) {
          .hero-trust-row {
            justify-content: center;
          }
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-align: left;
        }

        .trust-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-green {
          background: rgba(0, 230, 118, 0.15);
          color: #00E676;
          border: 1px solid rgba(0, 230, 118, 0.3);
        }

        .icon-pink {
          background: rgba(255, 46, 147, 0.15);
          color: #FF2E93;
          border: 1px solid rgba(255, 46, 147, 0.3);
        }

        .icon-cyan {
          background: rgba(0, 229, 255, 0.15);
          color: #00E5FF;
          border: 1px solid rgba(0, 229, 255, 0.3);
        }

        .trust-text {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .trust-text strong {
          font-size: 0.9rem;
          color: #FFFFFF;
        }

        .trust-text span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Right Visual Showcase */
        .hero-visual {
          position: relative;
          width: 100%;
        }

        .visual-card-wrapper {
          position: relative;
          border-radius: var(--radius-xl);
          padding: 1px;
        }

        .card-ambient-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(135deg, #FFD700 0%, #FF2E93 50%, #7B2CBF 100%);
          border-radius: var(--radius-xl);
          opacity: 0.45;
          filter: blur(12px);
          z-index: 0;
          transition: opacity 0.4s ease;
        }

        .visual-card-wrapper:hover .card-ambient-glow {
          opacity: 0.75;
          filter: blur(16px);
        }

        .visual-card {
          position: relative;
          z-index: 1;
          background: rgba(24, 10, 52, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }

        .hero-image-wrapper {
          position: relative;
          width: 100%;
          height: 380px;
          overflow: hidden;
        }

        @media (max-width: 576px) {
          .hero-image-wrapper {
            height: 280px;
          }
        }

        .hero-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .visual-card:hover .hero-main-img {
          transform: scale(1.04);
        }

        .hero-image-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 5, 33, 0.1) 0%, rgba(15, 5, 33, 0.85) 100%);
        }

        /* Floating Chips */
        .floating-chip {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(18, 6, 38, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          z-index: 2;
        }

        .chip-top {
          top: 1.25rem;
          right: 1.25rem;
          border-color: rgba(255, 215, 0, 0.4);
        }

        .chip-bottom {
          bottom: 1.25rem;
          left: 1.25rem;
          border-color: rgba(255, 46, 147, 0.4);
        }

        .chip-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chip-gold {
          background: rgba(255, 215, 0, 0.15);
        }

        .chip-pink {
          background: rgba(255, 46, 147, 0.15);
        }

        .chip-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .chip-bold {
          font-size: 0.825rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .chip-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .hero-card-footer {
          padding: 1rem 1.25rem;
          background: rgba(15, 5, 33, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .quick-service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          justify-content: center;
        }

        .tag-dot {
          font-size: 0.8rem;
          font-weight: 600;
          color: #FFD54F;
        }
      `}</style>
    </section>
  );
}
