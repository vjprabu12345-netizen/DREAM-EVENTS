'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { saveInquiry } from '../../lib/storage';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveInquiry(formData);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {}

    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold">Contact Us</span>
          </div>

          <span className="badge-pill badge-gold">
            <Sparkles size={14} />
            Official Booking Office & Helpdesk
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Get in Touch with <span className="text-gold-gradient">Dream Events</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            We are here to assist with date availability, package customizations, tastings, and venue site inspections.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="contact-grid">
          {/* Contact Cards Column */}
          <div className="contact-info-col">
            {/* Phone Lines Card */}
            <div className="info-box glass-panel">
              <div className="box-header">
                <div className="icon-wrap icon-green">
                  <Phone size={22} />
                </div>
                <div>
                  <h3>Direct Phone Lines</h3>
                  <p>Speak directly to our booking desk</p>
                </div>
              </div>

              <div className="phone-rows-list">
                {BUSINESS_INFO.phones.map((p, idx) => (
                  <div key={idx} className="phone-row-card">
                    <div className="phone-row-meta">
                      <strong>{p.display}</strong>
                      <span>{p.label}</span>
                    </div>
                    <a href={`tel:${p.number}`} className="btn btn-outline-gold btn-sm">
                      Call Now
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Location Card */}
            <div className="info-box glass-panel">
              <div className="box-header">
                <div className="icon-wrap icon-gold">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3>Office & Kitchen Facility</h3>
                  <p>Villupuram Central</p>
                </div>
              </div>

              <p className="address-full-text">
                {BUSINESS_INFO.address.full}
              </p>

              <div className="hours-row">
                <Clock size={16} className="text-gold" />
                <span>Open for Consultations: Monday - Sunday (8:00 AM - 10:00 PM)</span>
              </div>
            </div>

            {/* WhatsApp Quick Chat */}
            <div className="whatsapp-box glass-panel">
              <div>
                <h4>Fastest Response via WhatsApp</h4>
                <p>Chat with our live counter planner to get brochures, videos & custom rates.</p>
              </div>
              <a 
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20would%20like%20to%20discuss%20stalls%20for%20my%20event.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={18} />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="contact-form-col">
            <div className="inquiry-card glass-panel">
              {submitted ? (
                <div className="inquiry-success">
                  <CheckCircle2 size={48} className="text-green" />
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out, <strong>{formData.name}</strong>. Our event coordinator will call you back within 30 minutes.</p>
                  
                  <div className="success-actions">
                    <a 
                      href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20just%20submitted%20an%20inquiry%20from%20${encodeURIComponent(formData.name)}%20(${encodeURIComponent(formData.phone)}).`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-lg"
                    >
                      <MessageSquare size={18} />
                      <span>Ping on WhatsApp Directly</span>
                    </a>

                    <button 
                      type="button" 
                      className="btn btn-glass"
                      onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', message: '' }); }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="actual-inquiry-form">
                  <h3>Send Us a Quick Message</h3>
                  <p className="form-sub">Have a quick question about dates or counter setups? Drop us a note:</p>

                  <div className="form-group">
                    <label>Your Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Anand Kumar" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 94888 19134" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="e.g. yourname@gmail.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>How Can We Help?</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tell us your approximate date, venue location, or any specific stall queries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary-gold btn-lg submit-inq-btn">
                    <Send size={18} />
                    <span>Send Inquiry Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="map-section glass-panel">
          <div className="map-header">
            <MapPin size={20} className="text-gold" />
            <div>
              <h3>Our Location on Google Maps</h3>
              <p>Thiruvalluvar Nagar, Virattikuppam Road, Villupuram 605602, Tamil Nadu</p>
            </div>
          </div>

          <div className="map-iframe-wrapper">
            <iframe 
              src={BUSINESS_INFO.mapEmbedUrl}
              title="Dream Events Villupuram Office Location Map"
              width="100%" 
              height="380" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        .contact-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .info-box {
          padding: 2rem;
          border-radius: 20px;
        }

        .box-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-green {
          background: rgba(0, 230, 118, 0.15);
          color: #00E676;
          border: 1px solid rgba(0, 230, 118, 0.3);
        }

        .icon-gold {
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .box-header h3 {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .box-header p {
          font-size: 0.82rem;
          color: #A697C7;
        }

        .phone-rows-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .phone-row-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .phone-row-meta {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .phone-row-meta strong {
          font-size: 1rem;
          color: #ffffff;
        }

        .phone-row-meta span {
          font-size: 0.74rem;
          color: #A697C7;
        }

        .address-full-text {
          font-size: 1rem;
          color: #E2D9F3;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .hours-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: #FFE082;
          background: rgba(255, 215, 0, 0.06);
          padding: 0.65rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 215, 0, 0.2);
        }

        .whatsapp-box {
          padding: 2rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(18, 140, 126, 0.25) 100%);
          border-color: rgba(37, 211, 102, 0.4);
        }

        .whatsapp-box h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .whatsapp-box p {
          font-size: 0.82rem;
          color: #E2D9F3;
        }

        /* Inquiry Card */
        .inquiry-card {
          padding: 2.5rem;
          border-radius: 24px;
        }

        .inquiry-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }

        .form-sub {
          color: #A697C7;
          font-size: 0.9rem;
          margin-bottom: 1.75rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.25rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #E2D9F3;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.9rem 1.1rem;
          background: rgba(10, 3, 22, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }

        .submit-inq-btn {
          width: 100%;
          margin-top: 0.5rem;
        }

        .inquiry-success {
          text-align: center;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          margin-top: 1rem;
        }

        /* Map */
        .map-section {
          border-radius: 24px;
          overflow: hidden;
        }

        .map-header {
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .map-header h3 {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .map-header p {
          font-size: 0.85rem;
          color: #A697C7;
        }

        .map-iframe-wrapper {
          width: 100%;
          height: 380px;
          background: #000000;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .whatsapp-box {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
