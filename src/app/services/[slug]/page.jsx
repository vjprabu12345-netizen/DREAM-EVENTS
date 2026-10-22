import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Clock, 
  Users, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { SERVICES_DATA } from '../../../data/services';
import { BUSINESS_INFO } from '../../../data/businessInfo';

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const service = SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id).slice(0, 3);

  const waBookingMessage = `Hi Dream Events! I am interested in booking the *${service.name}* live counter for our upcoming event. Please share availability and customized packages.`;
  const waUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(waBookingMessage)}`;

  return (
    <div className="service-slug-page">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/services">Services</Link>
            <ChevronRight size={14} />
            <span className="text-gold">{service.name}</span>
          </div>

          <div className="badge-pill badge-gold">
            <Sparkles size={14} />
            <span>{service.category} Signature Stall</span>
          </div>

          <h1 className="service-headline">
            {service.name} <span className="text-gold-gradient">Live Counter</span>
          </h1>
          <p className="service-subheading">{service.tagline}</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="detail-layout">
          {/* Main Content Column */}
          <div className="detail-main">
            {/* Visual Banner */}
            <div className="main-image-card glass-panel">
              <img src={service.image} alt={service.name} className="hero-counter-img" />
              <div className="image-badges">
                <div className="rating-badge">
                  <Star size={16} fill="#FFD700" color="#FFD700" />
                  <span>{service.rating} ({service.reviewCount} Reviews)</span>
                </div>
                <div className="serving-style-badge">
                  <span>{service.servingStyle}</span>
                </div>
              </div>
            </div>

            {/* Deep Description */}
            <div className="content-card glass-panel">
              <h2 className="card-section-title">Experience & Counter Description</h2>
              <p className="detailed-text">{service.detailedDescription}</p>

              {/* Quick Specs Grid */}
              <div className="specs-grid">
                <div className="spec-card">
                  <Clock size={20} className="text-gold" />
                  <div>
                    <span className="spec-label">Setup Time</span>
                    <strong>{service.setupTime}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <Users size={20} className="text-cyan" />
                  <div>
                    <span className="spec-label">Serving Capacity</span>
                    <strong>{service.servingCapacity}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <ShieldCheck size={20} className="text-green" />
                  <div>
                    <span className="spec-label">Hygiene Standard</span>
                    <strong>100% Food-Grade Sanitized</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Inclusions & Features */}
            <div className="content-card glass-panel">
              <h2 className="card-section-title">What is Included in This Counter</h2>
              <div className="inclusions-grid">
                {service.includedItems.map((item, idx) => (
                  <div key={idx} className="inclusion-item">
                    <CheckCircle2 size={18} className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular For */}
            <div className="content-card glass-panel">
              <h2 className="card-section-title">Recommended Celebrations</h2>
              <div className="occasions-pills">
                {service.popularFor.map((occ, idx) => (
                  <span key={idx} className="occasion-pill">
                    ✦ {occ}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="content-card glass-panel">
                <h2 className="card-section-title">
                  <HelpCircle size={20} className="text-gold inline-icon" />
                  Frequently Asked Questions
                </h2>
                <div className="faqs-list">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="faq-box">
                      <h3 className="faq-q">{faq.q}</h3>
                      <p className="faq-a">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar Column */}
          <aside className="detail-sidebar">
            <div className="booking-card glass-panel">
              <div className="booking-card-header">
                <span className="booking-card-eyebrow">Counter Rate</span>
                <div className="booking-card-price">
                  <span className="currency">₹</span>
                  <span className="amount">{service.basePrice}</span>
                  <span className="per">/ guest</span>
                </div>
                <p className="min-guests-notice">Minimum {service.minGuests} guests booking required</p>
              </div>

              <div className="booking-card-body">
                <div className="booking-perks">
                  <div className="perk-row">
                    <CheckCircle2 size={16} className="text-green" />
                    <span>Uniformed Stall Attendant</span>
                  </div>
                  <div className="perk-row">
                    <CheckCircle2 size={16} className="text-green" />
                    <span>Eco-friendly Disposables</span>
                  </div>
                  <div className="perk-row">
                    <CheckCircle2 size={16} className="text-green" />
                    <span>Full On-Site Setup & Cleanup</span>
                  </div>
                </div>

                <div className="sidebar-action-buttons">
                  <Link 
                    href={`/book?service=${encodeURIComponent(service.name)}`} 
                    className="btn btn-primary-gold btn-lg sidebar-btn"
                  >
                    <Sparkles size={18} />
                    <span>Book {service.name}</span>
                  </Link>

                  <a 
                    href={waUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-whatsapp sidebar-btn"
                  >
                    <MessageSquare size={18} />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <a 
                    href={`tel:${BUSINESS_INFO.primaryPhone}`} 
                    className="btn btn-glass sidebar-btn"
                  >
                    <Phone size={18} />
                    <span>Call +91 94888 19134</span>
                  </a>
                </div>

                <div className="calculator-upsell">
                  <p>Want multiple stalls at a discounted bundle?</p>
                  <Link href="/calculator" className="text-gold">
                    Calculate Package Price &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Other Recommended Stalls */}
        <div className="other-stalls-section">
          <div className="other-stalls-header">
            <h3>Explore More Live Stalls</h3>
            <Link href="/services" className="see-all-link">
              <span>View All 7 Counters</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="other-stalls-grid">
            {otherServices.map((other) => (
              <Link 
                key={other.id} 
                href={`/services/${other.slug}`} 
                className="other-stall-card glass-panel"
              >
                <div className="other-img-box">
                  <img src={other.image} alt={other.name} />
                </div>
                <div className="other-info">
                  <span className="other-cat text-gold">{other.category}</span>
                  <h4>{other.name}</h4>
                  <p>{other.shortDescription.slice(0, 80)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .service-headline {
          font-size: clamp(1.4rem, 2.5vw, 1.95rem);
          font-weight: 700;
          margin: 0.5rem 0 0.35rem;
        }

        .service-subheading {
          font-size: 0.92rem;
          color: #E2D9F3;
          max-width: 600px;
          margin: 0 auto;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2.5rem;
          align-items: flex-start;
          margin-bottom: 4rem;
        }

        .detail-main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .main-image-card {
          position: relative;
          height: 420px;
          border-radius: 24px;
          overflow: hidden;
        }

        .hero-counter-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-badges {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .rating-badge {
          background: rgba(10, 3, 22, 0.9);
          backdrop-filter: blur(8px);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 215, 0, 0.4);
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
        }

        .serving-style-badge {
          background: rgba(10, 3, 22, 0.9);
          backdrop-filter: blur(8px);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.85rem;
          color: #FFE082;
          font-weight: 600;
        }

        .content-card {
          padding: 2.25rem;
          border-radius: 20px;
        }

        .card-section-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .detailed-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #E2D9F3;
          margin-bottom: 2rem;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1.5rem;
        }

        .spec-card {
          background: rgba(255, 255, 255, 0.04);
          padding: 1.25rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .spec-label {
          display: block;
          font-size: 0.75rem;
          color: #A697C7;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }

        .spec-card strong {
          font-size: 0.95rem;
          color: #ffffff;
        }

        .inclusions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem 1.5rem;
        }

        .inclusion-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.95rem;
          color: #F1EAFF;
          line-height: 1.45;
        }

        .check-icon {
          color: #00E676;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .occasions-pills {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .occasion-pill {
          padding: 0.5rem 1.1rem;
          background: rgba(255, 215, 0, 0.08);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 9999px;
          color: #FFE082;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .faqs-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .faq-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .faq-q {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.45rem;
        }

        .faq-a {
          font-size: 0.92rem;
          color: #CBBEE2;
          line-height: 1.6;
        }

        /* Sidebar */
        .detail-sidebar {
          position: sticky;
          top: 96px;
        }

        .booking-card {
          border-radius: 24px;
          overflow: hidden;
          border-color: rgba(255, 215, 0, 0.35);
        }

        .booking-card-header {
          background: linear-gradient(135deg, rgba(123, 44, 191, 0.4) 0%, rgba(255, 215, 0, 0.15) 100%);
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .booking-card-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #FFE082;
          font-weight: 700;
        }

        .booking-card-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
          margin: 0.5rem 0;
        }

        .currency {
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFD700;
        }

        .amount {
          font-size: 3rem;
          font-weight: 900;
          font-family: var(--font-heading);
          color: #FFD700;
        }

        .per {
          font-size: 0.9rem;
          color: #E2D9F3;
        }

        .min-guests-notice {
          font-size: 0.8rem;
          color: #A697C7;
        }

        .booking-card-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .booking-perks {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .perk-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.88rem;
          color: #E2D9F3;
        }

        .sidebar-action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sidebar-btn {
          width: 100%;
          text-align: center;
        }

        .calculator-upsell {
          text-align: center;
          font-size: 0.82rem;
          color: #A697C7;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1rem;
        }

        .calculator-upsell a {
          font-weight: 700;
          display: inline-block;
          margin-top: 0.25rem;
        }

        /* Other Stalls */
        .other-stalls-section {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 3.5rem;
        }

        .other-stalls-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .other-stalls-header h3 {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .see-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #FFD700;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .other-stalls-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .other-stall-card {
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s, border-color 0.3s;
          display: flex;
          flex-direction: column;
        }

        .other-stall-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 215, 0, 0.4);
        }

        .other-img-box {
          height: 160px;
          width: 100%;
          overflow: hidden;
        }

        .other-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }

        .other-stall-card:hover .other-img-box img {
          transform: scale(1.06);
        }

        .other-info {
          padding: 1.25rem;
        }

        .other-cat {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
          display: block;
        }

        .other-info h4 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .other-info p {
          font-size: 0.82rem;
          color: #A697C7;
          line-height: 1.5;
        }

        @media (max-width: 992px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }
          .detail-sidebar {
            position: static;
          }
          .specs-grid {
            grid-template-columns: 1fr;
          }
          .inclusions-grid {
            grid-template-columns: 1fr;
          }
          .other-stalls-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
