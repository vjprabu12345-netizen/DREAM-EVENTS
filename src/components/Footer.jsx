import React from 'react';
import { Crown, Phone, MapPin, MessageSquare, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { SERVICES_DATA } from '../data/services';

export default function Footer({ onNavClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      {/* Decorative Golden Top Line */}
      <div className="footer-gold-bar"></div>

      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <div className="footer-crown-wrap">
                <Crown size={22} className="text-gold" />
              </div>
              <div className="footer-brand-title-wrap">
                <h3 className="footer-brand-name">DREAM EVENTS</h3>
                <span className="footer-brand-tagline">Make Every Moment Special</span>
              </div>
            </div>

            <p className="footer-bio">
              Villupuram’s premier provider of interactive food counters, live dessert stalls, sweet paan, and refreshing beverage bars for unforgettable celebrations.
            </p>

            <div className="footer-wa-badge-box">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20would%20like%20to%20enquire%20about%20catering%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-btn"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp: 94888 19134</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => onNavClick(e, 'home')}>Home</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => onNavClick(e, 'services')}>Our Services</a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => onNavClick(e, 'booking')}>Book Your Event</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => onNavClick(e, 'about')}>About Us</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => onNavClick(e, 'contact')}>Contact Details</a>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="footer-col">
            <h4 className="footer-heading">Our 7 Signature Counters</h4>
            <ul className="footer-links-list">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a href="#services" onClick={(e) => onNavClick(e, 'services')}>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Column */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact & Location</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={18} className="text-pink shrink-0" />
                <address className="footer-address">
                  {BUSINESS_INFO.address.street},<br />
                  {BUSINESS_INFO.address.city} - {BUSINESS_INFO.address.pincode},<br />
                  {BUSINESS_INFO.address.state}, India.
                </address>
              </div>

              <div className="footer-contact-item">
                <Phone size={18} className="text-gold shrink-0" />
                <div className="footer-phones">
                  {BUSINESS_INFO.phones.map((phone, idx) => (
                    <a key={idx} href={`tel:${phone.number}`} className="footer-tel">
                      {phone.display} {phone.isPrimary && <span className="tel-badge">Primary</span>}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2026 <strong>Dream Events</strong>. All rights reserved. Crafting sweet memories in Villupuram.
          </p>

          <button 
            type="button" 
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .site-footer {
          position: relative;
          background: #090214;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 4.5rem;
          padding-bottom: 2.5rem;
          overflow: hidden;
        }

        .footer-gold-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #7B2CBF 0%, #FFD700 50%, #FF2E93 100%);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 1fr 1.25fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.15rem;
        }

        .footer-crown-wrap {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 215, 0, 0.12);
          border: 1px solid rgba(255, 215, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-brand-name {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #FFFFFF;
          line-height: 1.1;
        }

        .footer-brand-tagline {
          font-size: 0.725rem;
          color: #FFD54F;
          font-weight: 600;
        }

        .footer-bio {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .footer-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.4);
          border-radius: var(--radius-full);
          color: #69F0AE;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .footer-wa-btn:hover {
          background: #25D366;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .footer-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 28px;
          height: 2px;
          background: #FFD700;
          border-radius: 2px;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-links-list a {
          font-size: 0.88rem;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: inline-block;
        }

        .footer-links-list a:hover {
          color: #FFD700;
          transform: translateX(4px);
        }

        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-contact-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .footer-address {
          font-style: normal;
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .footer-phones {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .footer-tel {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #FFFFFF;
          transition: color 0.2s ease;
        }

        .footer-tel:hover {
          color: #FFD700;
        }

        .tel-badge {
          font-size: 0.65rem;
          padding: 0.15rem 0.45rem;
          background: rgba(255, 215, 0, 0.2);
          border: 1px solid rgba(255, 215, 0, 0.4);
          color: #FFD700;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-to-top-btn:hover {
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
          border-color: rgba(255, 215, 0, 0.4);
        }

        .shrink-0 { flex-shrink: 0; }
        .text-gold { color: #FFD700; }
        .text-pink { color: #FF2E93; }
      `}</style>
    </footer>
  );
}
