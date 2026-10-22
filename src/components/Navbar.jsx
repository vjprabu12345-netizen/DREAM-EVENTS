import React, { useState, useEffect } from 'react';
import { Crown, Phone, MessageSquare, Menu, X, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function Navbar({ onBookNowClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a 
          href="#home" 
          className="brand-logo"
          onClick={(e) => handleNavClick(e, 'home')}
          aria-label="Dream Events Home"
        >
          <div className="crown-badge">
            <Crown className="crown-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">DREAM EVENTS</span>
            <span className="brand-subtitle">Catering & Celebrations</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a 
            href="#home" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            Home
          </a>
          <a 
            href="#services" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'services')}
          >
            Our Services
          </a>
          <a 
            href="#about" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About Us
          </a>
          <a 
            href="#contact" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Contact
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="nav-actions">
          {/* Quick Call Link */}
          <a 
            href={`tel:${BUSINESS_INFO.primaryPhone}`} 
            className="nav-phone-link"
            title={`Call ${BUSINESS_INFO.primaryPhone}`}
          >
            <div className="phone-icon-wrap">
              <Phone size={16} />
            </div>
            <div className="phone-info">
              <span className="phone-label">Call Now</span>
              <span className="phone-number">94888 19134</span>
            </div>
          </a>

          {/* Book Now Button */}
          <button 
            type="button" 
            className="btn btn-primary-gold nav-book-btn"
            onClick={onBookNowClick}
          >
            <Sparkles size={16} />
            <span>Book Now</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-inner">
          <div className="drawer-links">
            <a 
              href="#home" 
              className="drawer-link"
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
            <a 
              href="#services" 
              className="drawer-link"
              onClick={(e) => handleNavClick(e, 'services')}
            >
              Our Services
            </a>
            <a 
              href="#about" 
              className="drawer-link"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About Us
            </a>
            <a 
              href="#contact" 
              className="drawer-link"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
          </div>

          <div className="drawer-cta-group">
            <button 
              type="button" 
              className="btn btn-primary-gold w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookNowClick();
              }}
            >
              <Sparkles size={18} />
              <span>Book Your Event Now</span>
            </button>

            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20would%20like%20to%20enquire%20about%20catering%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full"
            >
              <MessageSquare size={18} />
              <span>WhatsApp Us (94888 19134)</span>
            </a>

            <div className="drawer-phone-list">
              <span className="drawer-phone-title">Direct Calling Numbers:</span>
              {BUSINESS_INFO.phones.map((p, idx) => (
                <a key={idx} href={`tel:${p.number}`} className="drawer-phone-item">
                  <Phone size={14} />
                  <span>{p.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
          background: rgba(15, 5, 33, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .navbar-scrolled {
          background: rgba(12, 3, 27, 0.94);
          border-bottom-color: rgba(255, 215, 0, 0.25);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          gap: 1.5rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
        }

        .crown-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(157, 78, 221, 0.3));
          border: 1.5px solid rgba(255, 215, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFD700;
          box-shadow: 0 0 16px rgba(255, 215, 0, 0.35);
          transition: transform 0.3s ease;
        }

        .brand-logo:hover .crown-badge {
          transform: rotate(5deg) scale(1.08);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: linear-gradient(135deg, #FFFDE7 0%, #FFD700 60%, #FFA000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
        }

        .brand-subtitle {
          font-size: 0.725rem;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          margin-top: 2px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color 0.2s ease, transform 0.2s ease;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--gold-gradient);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .nav-link:hover {
          color: #FFD700;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .nav-phone-link {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }

        .nav-phone-link:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.35);
        }

        .phone-icon-wrap {
          color: #FFD700;
          display: flex;
        }

        .phone-info {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .phone-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .phone-number {
          font-size: 0.85rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .nav-book-btn {
          padding: 0.65rem 1.35rem;
          font-size: 0.875rem;
        }

        .mobile-toggle-btn {
          display: none;
          background: transparent;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 8px;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          display: none;
        }

        @media (max-width: 960px) {
          .desktop-nav {
            display: none;
          }

          .nav-phone-link {
            display: none;
          }

          .mobile-toggle-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-drawer {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(14, 4, 30, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 2px solid rgba(255, 215, 0, 0.3);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
          }

          .mobile-drawer.drawer-open {
            max-height: 540px;
          }

          .drawer-inner {
            padding: 1.75rem 1.5rem 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .drawer-links {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .drawer-link {
            font-size: 1.15rem;
            font-weight: 700;
            padding: 0.65rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            color: var(--text-primary);
          }

          .drawer-link:hover {
            color: #FFD700;
          }

          .drawer-cta-group {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
          }

          .drawer-phone-list {
            margin-top: 0.5rem;
            padding-top: 0.75rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .drawer-phone-title {
            font-size: 0.8rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .drawer-phone-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
            font-weight: 600;
            color: #FFD700;
          }

          .w-full {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
