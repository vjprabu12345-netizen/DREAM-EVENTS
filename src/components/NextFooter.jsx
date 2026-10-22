'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Phone, MessageSquare, MapPin, Mail, Sparkles, Heart, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { SERVICES_DATA } from '../data/services';

export default function NextFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      {/* Top Banner Accent */}
      <div className="footer-glow"></div>

      <div className="container footer-container">
        {/* Main Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col brand-col">
            <Link href="/" className="footer-brand-logo">
              <div className="footer-crown-badge">
                <Crown size={22} />
              </div>
              <div>
                <span className="brand-title">DREAM EVENTS</span>
                <span className="brand-subtitle">Catering & Celebrations</span>
              </div>
            </Link>

            <p className="footer-bio">
              Villupuram's premier event catering specialists delivering luxury live food stalls, gourmet dessert stations, and refreshing mocktail bars across Tamil Nadu & Pondicherry.
            </p>

            <div className="footer-social-row">
              <a 
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn social-whatsapp"
                aria-label="WhatsApp Chat"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Us</span>
              </a>

              <a 
                href={`tel:${BUSINESS_INFO.primaryPhone}`} 
                className="social-btn social-call"
                aria-label="Call Dream Events"
              >
                <Phone size={16} />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/services" className="footer-link">Signature Stalls</Link></li>
              <li><Link href="/calculator" className="footer-link">Cost Estimator & Blueprint</Link></li>
              <li><Link href="/gallery" className="footer-link">Celebration Gallery</Link></li>
              <li><Link href="/about" className="footer-link">About Dream Events</Link></li>
              <li><Link href="/contact" className="footer-link">Contact & Location</Link></li>
              <li><Link href="/track" className="footer-link">Track Booking Status</Link></li>
              <li><Link href="/admin" className="footer-link admin-footer-link"><Shield size={13} /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Live Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Live Stalls</h4>
            <ul className="footer-links-list">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="footer-link">
                    {service.name} Counter
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact & Booking</h4>
            <div className="footer-contact-details">
              <div className="contact-row">
                <MapPin size={18} className="contact-icon text-gold" />
                <span className="contact-text">{BUSINESS_INFO.address.full}</span>
              </div>

              <div className="contact-row">
                <Phone size={18} className="contact-icon text-green" />
                <div className="phone-stack">
                  {BUSINESS_INFO.phones.map((p, idx) => (
                    <a key={idx} href={`tel:${p.number}`} className="phone-item">
                      <strong>{p.display}</strong>
                      <span className="phone-label">({p.label.split(' ')[0]})</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="booking-hours-badge">
                <Sparkles size={14} className="text-gold" />
                <span>Open for Bookings 7 Days a Week (8 AM - 10 PM)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} Dream Events. All rights reserved. Made with <Heart size={14} className="inline-heart" /> for unforgettable celebrations.
          </p>
          <div className="bottom-links">
            <Link href="/track">Lookup Booking</Link>
            <span className="sep">•</span>
            <Link href="/calculator">Cost Calculator</Link>
            <span className="sep">•</span>
            <Link href="/admin">Staff Admin</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-wrapper {
          position: relative;
          background: #080214;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 4.5rem;
          padding-bottom: 2rem;
          margin-top: auto;
          overflow: hidden;
        }

        .footer-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #FFD700 50%, transparent);
          box-shadow: 0 0 20px #FFD700;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr 1.8fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }

        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
          text-decoration: none;
        }

        .footer-crown-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--gold-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #120427;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.35);
        }

        .brand-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #ffffff;
          display: block;
          line-height: 1.1;
        }

        .brand-subtitle {
          font-size: 0.68rem;
          color: #FFD700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          display: block;
        }

        .footer-bio {
          font-size: 0.9rem;
          color: #A697C7;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .footer-social-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          transition: transform 0.2s;
        }

        .social-btn:hover {
          transform: translateY(-2px);
        }

        .social-whatsapp {
          background: #25D366;
          color: #ffffff;
        }

        .social-call {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .footer-heading {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: var(--gold-gradient);
          border-radius: 2px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-link {
          font-size: 0.88rem;
          color: #CBBEE2;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .footer-link:hover {
          color: #FFD700;
          transform: translateX(4px);
        }

        .admin-footer-link {
          color: #FFD54F;
        }

        .footer-contact-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-row {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          font-size: 0.88rem;
          color: #CBBEE2;
          line-height: 1.5;
        }

        .contact-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .text-gold {
          color: #FFD700;
        }

        .text-green {
          color: #00E676;
        }

        .phone-stack {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .phone-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #ffffff;
          font-size: 0.88rem;
          transition: color 0.2s;
        }

        .phone-item:hover {
          color: #00E676;
        }

        .phone-label {
          font-size: 0.75rem;
          color: #A697C7;
        }

        .booking-hours-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.9rem;
          border-radius: 8px;
          background: rgba(255, 215, 0, 0.08);
          border: 1px solid rgba(255, 215, 0, 0.2);
          font-size: 0.8rem;
          color: #FFE082;
          margin-top: 0.5rem;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.85rem;
          color: #8C7B9E;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .inline-heart {
          display: inline-block;
          vertical-align: middle;
          color: #FF2E93;
          margin: 0 2px;
        }

        .bottom-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bottom-links a {
          color: #A697C7;
          transition: color 0.2s;
        }

        .bottom-links a:hover {
          color: #FFD700;
        }

        .sep {
          color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
