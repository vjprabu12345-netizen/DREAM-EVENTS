'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Crown, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Shield, 
  Search, 
  Home, 
  Utensils, 
  Calculator, 
  Image as ImageIcon, 
  Users, 
  PhoneCall 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function NextNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Luxury Core Navigation with Icons & Badges
  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/services', icon: Utensils },
    { label: 'Estimator', href: '/calculator', icon: Calculator, badge: 'Live Quote' },
    { label: 'Gallery', href: '/gallery', icon: ImageIcon },
    { label: 'About', href: '/about', icon: Users },
    { label: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Sleek Brand Logo */}
        <Link href="/" className="nav-logo" aria-label="Dream Events Home">
          <div className="logo-icon-box">
            <Crown size={20} className="crown-svg" />
          </div>
          <div className="logo-text-group">
            <span className="logo-main-text">DREAM EVENTS</span>
            <span className="logo-sub-text">Catering & Live Counters</span>
          </div>
        </Link>

        {/* Redesigned Floating Glass Navigation Capsule */}
        <nav className="desktop-menu" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`menu-item ${active ? 'active' : ''}`}
              >
                <Icon size={14} className="menu-icon" />
                <span className="menu-text">{link.label}</span>
                {link.badge && !active && (
                  <span className="mini-badge">{link.badge}</span>
                )}
                {active && <span className="active-glow-dot" />}
              </Link>
            );
          })}
        </nav>

        {/* Refined Right Actions */}
        <div className="nav-actions">
          {/* Quick Track Booking */}
          <Link 
            href="/track" 
            className={`action-link-subtle ${pathname === '/track' ? 'active-subtle' : ''}`}
            title="Track Your Event Booking Status"
          >
            <Search size={14} />
            <span>Track</span>
          </Link>

          {/* Direct Phone Call Pill */}
          <a 
            href={`tel:${BUSINESS_INFO.primaryPhone}`} 
            className="phone-pill"
            title="Direct Call: +91 94888 19134"
          >
            <span className="live-pulse-dot" />
            <Phone size={13} className="phone-icon" />
            <span className="phone-num">94888 19134</span>
          </a>

          {/* Admin Portal Shortcut */}
          <Link 
            href="/admin" 
            className={`admin-icon-btn ${pathname === '/admin' ? 'active-admin' : ''}`}
            title="Admin Management Portal"
            aria-label="Admin Portal"
          >
            <Shield size={15} />
          </Link>

          {/* Primary CTA */}
          <Link href="/book" className="btn-book-cta">
            <Sparkles size={14} />
            <span>Book Now</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-pane" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="drawer-brand">
                <Crown size={18} className="text-gold" />
                <span>DREAM EVENTS</span>
              </div>
              <button 
                type="button" 
                className="drawer-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-nav-list">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`m-item ${active ? 'm-active' : ''}`}
                  >
                    <div className="m-item-left">
                      <div className={`m-icon-box ${active ? 'm-icon-active' : ''}`}>
                        <Icon size={18} />
                      </div>
                      <span className="m-label">{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="m-badge">{link.badge}</span>
                    )}
                  </Link>
                );
              })}

              <Link href="/track" className={`m-item ${pathname === '/track' ? 'm-active' : ''}`}>
                <div className="m-item-left">
                  <div className="m-icon-box">
                    <Search size={18} />
                  </div>
                  <span className="m-label">Track Booking Status</span>
                </div>
              </Link>

              <Link href="/admin" className={`m-item admin-m-item ${pathname === '/admin' ? 'm-active' : ''}`}>
                <div className="m-item-left">
                  <div className="m-icon-box m-icon-admin">
                    <Shield size={18} />
                  </div>
                  <span className="m-label">Admin Portal</span>
                </div>
              </Link>
            </div>

            <div className="m-footer">
              <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="m-phone-btn">
                <Phone size={16} />
                <span>Call +91 94888 19134</span>
              </a>
              <Link href="/book" className="btn btn-primary-gold" style={{ width: '100%', justifyContent: 'center' }}>
                <Sparkles size={16} />
                <span>Book Event Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar-root {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(12, 4, 28, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 215, 0, 0.15);
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .navbar-root.scrolled {
          background: rgba(8, 2, 20, 0.96);
          border-bottom-color: rgba(255, 215, 0, 0.3);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.65), 0 0 20px rgba(255, 215, 0, 0.08);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 1.5rem;
          max-width: 1280px;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #FFE082 0%, #FFD700 50%, #FF8F00 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #120427;
          box-shadow: 0 0 14px rgba(255, 215, 0, 0.45);
          transition: transform 0.3s ease;
        }

        .nav-logo:hover .logo-icon-box {
          transform: rotate(-6deg) scale(1.08);
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .logo-main-text {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          background: linear-gradient(135deg, #FFFDE7 0%, #FFD700 60%, #FFA000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-sub-text {
          font-size: 0.62rem;
          color: #C8BAE4;
          letter-spacing: 0.14em;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* ==========================================================================
           REFINED FLOATING NAVIGATION CAPSULE (THE NEW DESIGN)
           ========================================================================== */
        .desktop-menu {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(26, 11, 56, 0.65);
          border: 1px solid rgba(255, 215, 0, 0.22);
          padding: 0.35rem 0.5rem;
          border-radius: 9999px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.4),
            0 0 16px rgba(255, 215, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: all 0.3s ease;
        }

        .desktop-menu:hover {
          border-color: rgba(255, 215, 0, 0.35);
          box-shadow: 
            0 6px 24px rgba(0, 0, 0, 0.45),
            0 0 20px rgba(255, 215, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .menu-item {
          position: relative;
          font-size: 0.86rem;
          font-weight: 600;
          color: #E2D7F5;
          padding: 0.48rem 0.95rem;
          border-radius: 9999px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          border: 1px solid transparent;
          white-space: nowrap;
        }

        .menu-item:hover {
          color: #FFD700;
          background: rgba(255, 215, 0, 0.12);
          border-color: rgba(255, 215, 0, 0.28);
          transform: translateY(-1px);
        }

        .menu-item.active {
          color: #120427;
          background: linear-gradient(135deg, #FFE57F 0%, #FFD700 45%, #FFA000 100%);
          font-weight: 700;
          border-color: #FFE57F;
          box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
          transform: translateY(-1px);
        }

        .menu-item.active .menu-icon {
          color: #120427;
        }

        .menu-icon {
          color: #C8BAE4;
          transition: color 0.2s ease;
          flex-shrink: 0;
        }

        .menu-item:hover .menu-icon {
          color: #FFD700;
        }

        .menu-text {
          letter-spacing: 0.01em;
        }

        .mini-badge {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.12rem 0.4rem;
          border-radius: 9999px;
          background: rgba(255, 215, 0, 0.18);
          color: #FFE082;
          border: 1px solid rgba(255, 215, 0, 0.35);
          line-height: 1;
        }

        .active-glow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #120427;
          opacity: 0.8;
        }

        /* ==========================================================================
           RIGHT ACTIONS
           ========================================================================== */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .action-link-subtle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #C8BAE4;
          padding: 0.45rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s;
        }

        .action-link-subtle:hover,
        .action-link-subtle.active-subtle {
          color: #FFD700;
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.3);
        }

        .phone-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          background: rgba(0, 230, 118, 0.08);
          border: 1px solid rgba(0, 230, 118, 0.35);
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 700;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .phone-pill:hover {
          background: rgba(0, 230, 118, 0.18);
          border-color: #00E676;
          box-shadow: 0 0 14px rgba(0, 230, 118, 0.3);
          color: #00E676;
        }

        .phone-icon {
          color: #00E676;
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00E676;
          box-shadow: 0 0 8px #00E676;
          animation: livePulse 1.8s infinite;
        }

        @keyframes livePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.55; }
        }

        .phone-num {
          letter-spacing: 0.02em;
        }

        .admin-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #C8BAE4;
          transition: all 0.2s;
        }

        .admin-icon-btn:hover,
        .admin-icon-btn.active-admin {
          color: #FFD700;
          border-color: #FFD700;
          background: rgba(255, 215, 0, 0.15);
          box-shadow: 0 0 12px rgba(255, 215, 0, 0.3);
        }

        /* Primary CTA */
        .btn-book-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.48rem 1.15rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FFE082 0%, #FFD700 45%, #FFA000 100%);
          color: #120427;
          font-weight: 750;
          font-size: 0.84rem;
          box-shadow: 0 4px 18px rgba(255, 215, 0, 0.4);
          transition: all 0.25s ease;
          border: 1px solid rgba(255, 255, 255, 0.25);
          text-decoration: none;
        }

        .btn-book-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255, 215, 0, 0.6);
          background: linear-gradient(135deg, #FFF176 0%, #FFE082 40%, #FFB300 100%);
        }

        /* Mobile Hamburger */
        .mobile-hamburger {
          display: none;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 215, 0, 0.25);
          color: #ffffff;
          padding: 0.5rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mobile-hamburger:hover {
          background: rgba(255, 215, 0, 0.15);
          border-color: #FFD700;
        }

        /* Mobile Drawer */
        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(6, 2, 16, 0.8);
          backdrop-filter: blur(12px);
          z-index: 1001;
        }

        .mobile-menu-pane {
          position: absolute;
          top: 0;
          right: 0;
          width: 85%;
          max-width: 360px;
          height: 100%;
          background: rgba(13, 5, 30, 0.98);
          border-left: 1px solid rgba(255, 215, 0, 0.25);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          overflow-y: auto;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.8);
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .drawer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 0.05em;
        }

        .drawer-close {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .m-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #E2D9F3;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .m-item-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .m-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          color: #C8BAE4;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .m-item.m-active {
          background: rgba(255, 215, 0, 0.12);
          border-color: rgba(255, 215, 0, 0.4);
          color: #FFD700;
        }

        .m-item.m-active .m-icon-box {
          background: var(--gold-gradient);
          color: #120427;
        }

        .m-badge {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .m-icon-admin {
          color: #FFD700;
        }

        .m-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .m-phone-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem;
          border-radius: 12px;
          background: rgba(0, 230, 118, 0.12);
          border: 1px solid rgba(0, 230, 118, 0.4);
          color: #00E676;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1140px) {
          .phone-pill {
            display: none;
          }
        }

        @media (max-width: 960px) {
          .desktop-menu {
            display: none;
          }
          .action-link-subtle {
            display: none;
          }
          .mobile-hamburger {
            display: block;
          }
          .mobile-overlay {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}

