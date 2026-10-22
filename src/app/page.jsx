'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  Phone,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { TESTIMONIALS_DATA } from '../data/siteData';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function HomePage() {
  // Curated 4 top stalls for the home preview
  const featuredStalls = SERVICES_DATA.slice(0, 4);

  return (
    <div className="home-screen">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        <div className="container hero-container">
          <div className="hero-text-block">
            <div className="hero-pill">
              <Sparkles size={13} className="text-gold" />
              <span>Villupuram • Pondicherry • Celebrations</span>
            </div>

            <h1 className="hero-main-title">
              Artisanal Live Food Counters for <span className="text-gold-gradient">Unforgettable Celebrations</span>
            </h1>

            <p className="hero-subtext">
              Transform your wedding reception, birthday, or corporate gala with flowing Belgian chocolate fountains, exotic fruit carvings, theatrical mocktails, and royal sweet paan.
            </p>

            <div className="hero-cta-group">
              <Link href="/services" className="btn btn-primary-gold btn-sm">
                <span>Explore 7 Live Stalls</span>
                <ArrowRight size={15} />
              </Link>

              <Link href="/book" className="btn btn-outline-gold btn-sm">
                <Sparkles size={14} />
                <span>Book Event Date</span>
              </Link>

              <Link href="/calculator" className="btn btn-glass btn-sm">
                <Calculator size={14} />
                <span>Cost Estimator</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="hero-highlights-strip">
              <div className="hl-item">
                <CheckCircle2 size={14} className="text-green" />
                <span>100% Fresh Ingredients</span>
              </div>
              <div className="hl-item">
                <CheckCircle2 size={14} className="text-green" />
                <span>Uniformed Attendants</span>
              </div>
              <div className="hl-item">
                <CheckCircle2 size={14} className="text-green" />
                <span>Punctual Setup Guarantee</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="hero-media-block">
            <div className="media-frame glass-panel">
              <img 
                src="/images/hero-banner.jpg" 
                alt="Dream Events luxury catering counters" 
                className="hero-photo"
              />
              <div className="photo-overlay-chip">
                <Star size={14} fill="#FFD700" color="#FFD700" />
                <div>
                  <strong>1,250+ Events Catered</strong>
                  <span>5.0 Star Rated Across Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REFINED STATS STRIP */}
      <section className="stats-bar">
        <div className="container stats-inner">
          <div className="stat-item">
            <strong className="stat-number text-gold-gradient">1,250+</strong>
            <span className="stat-desc">Celebrations Catered</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <strong className="stat-number text-gold-gradient">7</strong>
            <span className="stat-desc">Signature Live Counters</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <strong className="stat-number text-gold-gradient">100%</strong>
            <span className="stat-desc">FSSAI Hygiene Standards</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <strong className="stat-number text-gold-gradient">5.0 ★</strong>
            <span className="stat-desc">Verified Client Ratings</span>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE STALLS TEASER */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Sparkles size={14} />
              <span>Signature Experiences</span>
            </div>
            <h2 className="section-title">
              Popular Live Food Counters
            </h2>
            <p className="section-subtitle">
              Interactive celebratory stations operated by uniformed attendants with commercial equipment and food-grade hygiene.
            </p>
          </div>

          <div className="stalls-preview-grid">
            {featuredStalls.map((stall) => (
              <div key={stall.id} className="stall-card glass-panel">
                <div className="stall-img-wrap">
                  <img src={stall.image} alt={stall.name} />
                  <span className="stall-cat-tag">{stall.category}</span>
                </div>

                <div className="stall-content">
                  <div className="stall-title-row">
                    <h3>{stall.name}</h3>
                    <span className="stall-price-tag">From ₹{stall.basePrice}/guest</span>
                  </div>
                  <p className="stall-tagline text-gold">{stall.tagline}</p>
                  <p className="stall-short-desc">{stall.shortDescription}</p>

                  <div className="stall-footer-links">
                    <Link href={`/services/${stall.slug}`} className="stall-detail-link">
                      <span>View Specifications</span>
                      <ChevronRight size={14} />
                    </Link>

                    <Link href={`/book?service=${encodeURIComponent(stall.name)}`} className="stall-book-link">
                      Book Stall &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="all-stalls-button-row">
            <Link href="/services" className="btn btn-outline-gold btn-sm">
              <span>View All 7 Live Stalls with Menus & Capacities</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. COMPACT ESTIMATOR TEASER */}
      <section className="compact-estimator-section">
        <div className="container">
          <div className="estimator-compact-banner glass-panel">
            <div className="estimator-text-side">
              <span className="badge-pill badge-gold">
                <Calculator size={13} />
                Instant Package Blueprint
              </span>
              <h3>Need an Instant Budget Estimate for Your Event?</h3>
              <p>
                Choose your guest count, select your favorite live stalls, and generate a customized pricing quote with automatic bundle discounts.
              </p>
            </div>

            <div className="estimator-btn-side">
              <Link href="/calculator" className="btn btn-primary-gold">
                <Sparkles size={16} />
                <span>Launch Cost Estimator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENT REVIEWS HIGHLIGHT */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <span>Real Customer Feedback</span>
            </div>
            <h2 className="section-title">
              What Hosts & Families Say
            </h2>
            <p className="section-subtitle">
              Delighting weddings, birthdays, and celebrations across Villupuram, Pondicherry, and Cuddalore.
            </p>
          </div>

          <div className="reviews-cards-row">
            {TESTIMONIALS_DATA.slice(0, 3).map((rev) => (
              <div key={rev.id} className="review-box glass-panel">
                <div className="stars-strip">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
                <p className="rev-quote">"{rev.text}"</p>
                <div className="rev-client">
                  <div className="client-avatar">{rev.avatar}</div>
                  <div>
                    <strong>{rev.name}</strong>
                    <span>{rev.event} • {rev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="cta-strip-section">
        <div className="container">
          <div className="cta-strip glass-panel">
            <div className="cta-copy">
              <h3>Plan Your Celebration with Dream Events</h3>
              <p>Direct bookings and WhatsApp inquiries open 7 days a week (8:00 AM – 10:00 PM).</p>
            </div>

            <div className="cta-btns">
              <Link href="/book" className="btn btn-primary-gold btn-sm">
                <Sparkles size={15} />
                <span>Book Event Now</span>
              </Link>

              <a 
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20would%20like%20to%20enquire%20about%20catering%20services.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageSquare size={15} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-screen {
          position: relative;
        }

        /* Hero */
        .hero-section {
          position: relative;
          padding: 3.5rem 0 3.5rem;
          overflow: hidden;
        }

        .hero-glow-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(123, 44, 191, 0.3) 0%, transparent 70%);
          top: -50px;
          left: -50px;
          filter: blur(80px);
          pointer-events: none;
        }

        .hero-glow-2 {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
          bottom: 0;
          right: 5%;
          filter: blur(80px);
          pointer-events: none;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.3rem 0.8rem;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #FFD54F;
          letter-spacing: 0.04em;
          align-self: flex-start;
        }

        .hero-main-title {
          font-size: clamp(1.75rem, 3.2vw, 2.45rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.015em;
          color: #ffffff;
        }

        .hero-subtext {
          font-size: 0.95rem;
          color: #D6C9ED;
          line-height: 1.65;
          max-width: 540px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 0.25rem;
        }

        .hero-highlights-strip {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.8rem;
          color: #E2D9F3;
        }

        .hl-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Hero Media */
        .hero-media-block {
          position: relative;
        }

        .media-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 320px;
          border-color: rgba(255, 215, 0, 0.3);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
        }

        .hero-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .media-frame:hover .hero-photo {
          transform: scale(1.03);
        }

        .photo-overlay-chip {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          background: rgba(10, 3, 22, 0.88);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 215, 0, 0.35);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .photo-overlay-chip strong {
          display: block;
          font-size: 0.84rem;
          color: #ffffff;
        }

        .photo-overlay-chip span {
          display: block;
          font-size: 0.72rem;
          color: #A697C7;
        }

        /* Stats Bar */
        .stats-bar {
          background: rgba(18, 7, 40, 0.6);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1.5rem 0;
        }

        .stats-inner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
        }

        .stat-number {
          font-size: 1.65rem;
          font-weight: 800;
          font-family: var(--font-heading);
        }

        .stat-desc {
          font-size: 0.78rem;
          color: #A697C7;
          font-weight: 500;
          margin-top: 0.15rem;
        }

        .stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Stalls Preview Grid */
        .stalls-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stall-card {
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.25s, border-color 0.25s;
          display: flex;
          flex-direction: column;
        }

        .stall-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 215, 0, 0.35);
        }

        .stall-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .stall-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }

        .stall-card:hover .stall-img-wrap img {
          transform: scale(1.06);
        }

        .stall-cat-tag {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: rgba(10, 3, 22, 0.85);
          color: #FFD700;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .stall-content {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .stall-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.25rem;
          gap: 0.5rem;
        }

        .stall-title-row h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
        }

        .stall-price-tag {
          font-size: 0.75rem;
          color: #FFD700;
          font-weight: 700;
          white-space: nowrap;
        }

        .stall-tagline {
          font-size: 0.76rem;
          margin-bottom: 0.5rem;
        }

        .stall-short-desc {
          font-size: 0.82rem;
          color: #A697C7;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex: 1;
        }

        .stall-footer-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.8rem;
        }

        .stall-detail-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #D6C9ED;
          transition: color 0.2s;
        }

        .stall-detail-link:hover {
          color: #FFD700;
        }

        .stall-book-link {
          color: #FFE082;
          font-weight: 700;
          transition: color 0.2s;
        }

        .stall-book-link:hover {
          color: #ffffff;
        }

        .all-stalls-button-row {
          text-align: center;
          margin-top: 1.5rem;
        }

        /* Compact Estimator */
        .compact-estimator-section {
          padding: 1rem 0 2rem;
        }

        .estimator-compact-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.25rem 2.5rem;
          border-radius: 20px;
          gap: 2rem;
          border-color: rgba(255, 215, 0, 0.3);
          background: linear-gradient(135deg, rgba(27, 10, 54, 0.9) 0%, rgba(45, 12, 85, 0.75) 100%);
        }

        .estimator-text-side {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .estimator-text-side h3 {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .estimator-text-side p {
          font-size: 0.88rem;
          color: #D6C9ED;
          max-width: 580px;
        }

        .estimator-btn-side {
          flex-shrink: 0;
        }

        /* Reviews */
        .reviews-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .review-box {
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .stars-strip {
          display: flex;
          gap: 0.2rem;
        }

        .rev-quote {
          font-size: 0.88rem;
          font-style: italic;
          color: #E2D9F3;
          line-height: 1.6;
          flex: 1;
        }

        .rev-client {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .client-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--gold-gradient);
          color: #120427;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.82rem;
        }

        .rev-client strong {
          display: block;
          font-size: 0.85rem;
          color: #ffffff;
        }

        .rev-client span {
          display: block;
          font-size: 0.72rem;
          color: #A697C7;
        }

        /* CTA Strip */
        .cta-strip-section {
          padding: 1rem 0 4rem;
        }

        .cta-strip {
          padding: 2rem 2.5rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          border-color: rgba(255, 215, 0, 0.35);
          background: linear-gradient(135deg, rgba(35, 12, 75, 0.95) 0%, rgba(65, 16, 115, 0.9) 100%);
        }

        .cta-copy h3 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .cta-copy p {
          font-size: 0.85rem;
          color: #D6C9ED;
        }

        .cta-btns {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
          }
          .media-frame {
            height: 240px;
          }
          .estimator-compact-banner {
            flex-direction: column;
            text-align: center;
            padding: 1.75rem;
          }
          .reviews-cards-row {
            grid-template-columns: 1fr;
          }
          .cta-strip {
            flex-direction: column;
            text-align: center;
            padding: 1.75rem;
          }
          .cta-btns {
            justify-content: center;
          }
          .stat-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
