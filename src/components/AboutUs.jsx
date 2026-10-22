import React from 'react';
import { Sparkles, Utensils, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';

export default function AboutUs({ onPlanCelebrationClick }) {
  const highlights = [
    {
      icon: <Utensils size={22} className="text-pink" />,
      title: "Interactive Live Counters",
      description: "From cascading chocolate fountains to freshly tossed fruit salads and spun cotton candy, we bring live excitement that delights every guest."
    },
    {
      icon: <ShieldCheck size={22} className="text-green" />,
      title: "100% Fresh & Hygienic",
      description: "We use only hand-selected seasonal fruits, certified ingredients, purified ice, and food-grade equipment maintained to the highest hygiene standards."
    },
    {
      icon: <Users size={22} className="text-cyan" />,
      title: "Uniformed Professional Staff",
      description: "Our polite, well-trained attendants oversee each counter in clean festive attire, ensuring seamless and courteous guest service throughout your event."
    },
    {
      icon: <Clock size={22} className="text-gold" />,
      title: "Punctual & Reliable Setup",
      description: "We arrive well before your event schedule to install illuminated counters, chilled displays, and food stalls so everything is ready for your first guest."
    }
  ];

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Visual Showcase */}
          <div className="about-visual">
            <div className="about-img-frame">
              <img
                src="/images/hero-banner.jpg"
                alt="Dream Events banquet food counter presentation in Villupuram"
                className="about-primary-img"
                loading="lazy"
              />
              <div className="about-img-overlay"></div>

              {/* Floating Stat Card */}
              <div className="about-stat-card animate-float">
                <div className="stat-icon-wrap">
                  <Sparkles size={24} className="text-gold" />
                </div>
                <div className="stat-info">
                  <span className="stat-number">Live & Fresh</span>
                  <span className="stat-desc">Food Counters for Every Occasion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction & Details */}
          <div className="about-content">
            <div className="section-eyebrow">
              <Sparkles size={16} />
              <span>About Dream Events</span>
            </div>

            <h2 className="about-title">
              Crafting Memorable Treats for <span className="text-gold-gradient">Every Celebration</span>
            </h2>

            <p className="about-lead">
              Based in <strong>Villupuram, Tamil Nadu</strong>, <strong>Dream Events</strong> specializes in providing captivating food counters, sweet treats, and refreshing drink stations for weddings, birthday parties, reception dinners, baby showers, and family gatherings.
            </p>

            <p className="about-body">
              We believe food is the heart of every great celebration. Whether your guests are dipping sweet treats into our multi-tier chocolate fountain, savoring royal traditional sweet beeda, enjoying chilled mocktails upon arrival, or enjoying retro buttered popcorn, our counters add color, joy, and unforgettable flavors to your special day.
            </p>

            {/* Service Highlights Grid */}
            <div className="highlights-grid">
              {highlights.map((item, idx) => (
                <div key={idx} className="highlight-card">
                  <div className="highlight-icon-box">{item.icon}</div>
                  <div className="highlight-info">
                    <h4 className="highlight-title">{item.title}</h4>
                    <p className="highlight-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="about-cta-row">
              <button
                type="button"
                className="btn btn-primary-gold"
                onClick={onPlanCelebrationClick}
              >
                <span>Plan Your Celebration</span>
                <ArrowRight size={18} />
              </button>

              <div className="about-location-note">
                <span>📍 Serving Thiruvalluvar Nagar & all across Villupuram district</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          background: rgba(13, 4, 28, 0.6);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .about-visual {
          position: relative;
        }

        .about-img-frame {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid rgba(255, 215, 0, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
        }

        .about-primary-img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        @media (max-width: 576px) {
          .about-primary-img {
            height: 340px;
          }
        }

        .about-img-frame:hover .about-primary-img {
          transform: scale(1.03);
        }

        .about-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 5, 33, 0.1) 0%, rgba(15, 5, 33, 0.8) 100%);
        }

        .about-stat-card {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          right: 2rem;
          background: rgba(22, 8, 48, 0.92);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 215, 0, 0.4);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
        }

        .stat-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 215, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFD700;
          line-height: 1.1;
        }

        .stat-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .about-content {
          display: flex;
          flex-direction: column;
        }

        .about-title {
          font-size: clamp(2rem, 3.5vw, 2.85rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }

        .about-lead {
          font-size: 1.1rem;
          color: #FFFFFF;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .about-body {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.25rem;
        }

        @media (max-width: 600px) {
          .highlights-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .highlight-card {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1.15rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .highlight-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 215, 0, 0.25);
          transform: translateY(-2px);
        }

        .highlight-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .highlight-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }

        .highlight-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .about-cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .about-location-note {
          font-size: 0.875rem;
          color: var(--text-gold);
          font-weight: 500;
        }

        .text-pink { color: #FF2E93; }
        .text-green { color: #00E676; }
        .text-cyan { color: #00E5FF; }
        .text-gold { color: #FFD700; }
      `}</style>
    </section>
  );
}
