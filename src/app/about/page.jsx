'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Award, 
  MapPin, 
  Users, 
  Heart, 
  CheckCircle2, 
  Phone, 
  MessageSquare,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { STATS_DATA } from '../../data/siteData';

export default function AboutPage() {
  const commitments = [
    {
      title: "100% Fresh & Natural Ingredients",
      desc: "From handpicked dragon fruits and strawberries to pure rose petal gulkand and rich Belgian fondue chocolate, we never compromise on raw ingredient quality.",
      icon: Award,
      color: "gold"
    },
    {
      title: "Strict FSSAI & Hygiene Protocol",
      desc: "Our live stall chefs and servers wear sanitized food-grade gloves, aprons, and hairnets. Ice used in mocktails and fruits is 100% purified mineral ice.",
      icon: ShieldCheck,
      color: "green"
    },
    {
      title: "Punctual Early Setup Guarantee",
      desc: "Our logistics team arrives at least 60 to 90 minutes before your ceremony starts, ensuring everything is fully illuminated, decorated, and operating flawlessly.",
      icon: Clock,
      color: "cyan"
    },
    {
      title: "Dressed Professional Hospitality Crew",
      desc: "Uniformed attendants trained in gracious customer hospitality, handling crowded banquet halls smoothly with smiles and courteous service.",
      icon: Users,
      color: "pink"
    }
  ];

  const coverageAreas = [
    "Villupuram Central & Districts",
    "Pondicherry (Puducherry & ECR)",
    "Cuddalore & Chidambaram",
    "Tindivanam & Vikravandi",
    "Ulundurpet & Kallakurichi",
    "Gingee & Thirukoilur",
    "Chengalpattu & South Chennai"
  ];

  return (
    <div className="about-page">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold">About Us</span>
          </div>

          <span className="badge-pill badge-gold">
            <Sparkles size={14} />
            Our Story & Heritage
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Making Celebrations Sweeter & <span className="text-gold-gradient">Unforgettable</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Founded in Villupuram, Dream Events is Tamil Nadu's favorite destination for celebratory live food stations, exotic fruit carving displays, and luxury dessert experiences.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Story Section */}
        <div className="story-grid">
          <div className="story-content">
            <span className="badge-pill badge-gold">The Dream Events Journey</span>
            <h2>Crafting Sweet Memories for Over a Decade</h2>
            <p>
              Dream Events started with a single, passionate mission: to transform standard banquet dining into an interactive, visually stunning festival of taste. We noticed that traditional event catering often lacked engaging live counters where guests could watch delicacies being crafted fresh before their eyes.
            </p>
            <p>
              Today, with over 1,250+ successful celebrations to our name, we manage 7 signature live stalls—ranging from flowing multi-tier Belgian chocolate fountains and dry-ice misted mocktails to authentic tobacco-free Sweet Beeda and nostalgic carnival carts.
            </p>

            <div className="story-quote glass-panel">
              <Heart size={20} className="text-pink inline-icon" />
              <em>"Every wedding and birthday is a once-in-a-lifetime milestone. We treat each counter like it is our own family's celebration."</em>
            </div>
          </div>

          <div className="story-visual">
            <div className="story-img-card glass-panel">
              <img src="/images/hero-banner.jpg" alt="Dream Events Live Stalls Setup" />
              <div className="story-floating-stat">
                <span className="stat-num text-gold-gradient">1,250+</span>
                <span className="stat-txt">Joyful Celebrations Catered</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="commitments-section">
          <div className="section-header">
            <div className="section-eyebrow">
              <ShieldCheck size={16} />
              <span>Our Core Standards</span>
            </div>
            <h2 className="section-title">
              Why Hosts <span className="text-gold-gradient">Trust Dream Events</span>
            </h2>
            <p className="section-subtitle">
              We hold every live stall to the highest hospitality, culinary, and hygiene benchmarks.
            </p>
          </div>

          <div className="commitments-grid">
            {commitments.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="commitment-card glass-panel">
                  <div className={`commitment-icon-wrap icon-${item.color}`}>
                    <IconComp size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coverage Areas */}
        <div className="coverage-card glass-panel">
          <div className="coverage-header">
            <div className="coverage-badge">
              <MapPin size={18} className="text-gold" />
              <span>Catering Across Tamil Nadu & Pondicherry</span>
            </div>
            <h3>Where We Travel & Serve</h3>
            <p>Based in Villupuram, our customized mobile live stall vans travel directly to your wedding mandapam, resort, or private lawn:</p>
          </div>

          <div className="coverage-pills-grid">
            {coverageAreas.map((loc, idx) => (
              <div key={idx} className="coverage-pill">
                <CheckCircle2 size={16} className="text-green" />
                <span>{loc}</span>
              </div>
            ))}
          </div>

          <div className="coverage-actions">
            <Link href="/book" className="btn btn-primary-gold btn-lg">
              <Sparkles size={18} />
              <span>Book Your Event Today</span>
            </Link>

            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp btn-lg"
            >
              <MessageSquare size={18} />
              <span>Chat with Coordinator</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .story-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: 3.5rem;
          align-items: center;
          margin-bottom: 5.5rem;
        }

        .story-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .story-content h2 {
          font-size: clamp(1.35rem, 2.2vw, 1.85rem);
          font-weight: 700;
          line-height: 1.25;
        }

        .story-content p {
          font-size: 0.92rem;
          color: #D6C9ED;
          line-height: 1.65;
        }

        .story-quote {
          padding: 1.5rem;
          border-radius: 16px;
          border-left: 4px solid #FFD700;
          color: #FFE082;
          font-size: 1.05rem;
          margin-top: 0.5rem;
        }

        .story-visual {
          position: relative;
        }

        .story-img-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          height: 420px;
        }

        .story-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-floating-stat {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          background: rgba(10, 3, 22, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 215, 0, 0.4);
          padding: 1.25rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .stat-num {
          font-size: 2.5rem;
          font-weight: 900;
          font-family: var(--font-heading);
          line-height: 1;
        }

        .stat-txt {
          font-size: 0.9rem;
          color: #ffffff;
          font-weight: 600;
        }

        /* Commitments */
        .commitments-section {
          margin-bottom: 5.5rem;
        }

        .commitments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .commitment-card {
          padding: 2.25rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .commitment-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .commitment-card h3 {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .commitment-card p {
          font-size: 0.92rem;
          color: #CBBEE2;
          line-height: 1.65;
        }

        .icon-gold {
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
          border: 1px solid rgba(255, 215, 0, 0.35);
        }

        .icon-green {
          background: rgba(0, 230, 118, 0.15);
          color: #00E676;
          border: 1px solid rgba(0, 230, 118, 0.35);
        }

        .icon-cyan {
          background: rgba(0, 229, 255, 0.15);
          color: #00E5FF;
          border: 1px solid rgba(0, 229, 255, 0.35);
        }

        .icon-pink {
          background: rgba(255, 46, 147, 0.15);
          color: #FF2E93;
          border: 1px solid rgba(255, 46, 147, 0.35);
        }

        /* Coverage */
        .coverage-card {
          padding: 3.5rem;
          border-radius: 28px;
          border-color: rgba(255, 215, 0, 0.35);
        }

        .coverage-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #FFD700;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .coverage-header h3 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .coverage-header p {
          color: #D6C9ED;
          font-size: 1.05rem;
        }

        .coverage-pills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
          margin: 2rem 0 2.5rem;
        }

        .coverage-pill {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #ffffff;
        }

        .coverage-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 992px) {
          .story-grid {
            grid-template-columns: 1fr;
          }
          .coverage-card {
            padding: 2.25rem;
          }
        }
      `}</style>
    </div>
  );
}
