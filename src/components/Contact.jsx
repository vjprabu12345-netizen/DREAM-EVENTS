import React, { useState } from 'react';
import { Phone, MapPin, MessageSquare, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ sent: false, error: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ sent: false, error: 'Please enter your name and contact phone number.' });
      return;
    }

    // Prepare WhatsApp Message
    const text = `👋 *Hello Dream Events!*\nMy name is *${formData.name}* (Phone: ${formData.phone}).\n\n*Message:* ${formData.message || 'I would like to enquire about your event catering live counters.'}`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus({ sent: true, error: '' });
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={16} />
            <span>Connect with Us</span>
          </div>
          <h2 className="section-title">
            Get in Touch with <span className="text-gold-gradient">Dream Events</span>
          </h2>
          <p className="section-subtitle">
            Planning a celebration in Villupuram or nearby areas? Reach out directly via phone, WhatsApp, or drop a quick inquiry below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Official Contact Information */}
          <div className="contact-info-card glass-panel">
            <h3 className="info-card-title">Official Contact Details</h3>
            <p className="info-card-desc">
              We are available 7 days a week to discuss customized menus, counter themes, and dates for your special occasions.
            </p>

            <div className="contact-channels">
              {/* Phone Numbers with Clickable tel: links */}
              <div className="channel-group">
                <div className="channel-icon-wrap icon-gold">
                  <Phone size={22} />
                </div>
                <div className="channel-details">
                  <span className="channel-title">Call Us Directly</span>
                  <div className="phones-vertical-list">
                    {BUSINESS_INFO.phones.map((phone, idx) => (
                      <a 
                        key={idx} 
                        href={`tel:${phone.number}`} 
                        className="clickable-phone-link"
                        title={`Call ${phone.display}`}
                      >
                        <strong className="phone-num-val">{phone.display}</strong>
                        <span className="phone-tag">{phone.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp Primary Contact */}
              <div className="channel-group">
                <div className="channel-icon-wrap icon-green">
                  <MessageSquare size={22} />
                </div>
                <div className="channel-details">
                  <span className="channel-title">WhatsApp Chat Enquiry</span>
                  <p className="channel-sub">Chat directly with our event manager</p>
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20would%20like%20to%20enquire%20about%20catering%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp contact-wa-btn"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp +91 94888 19134</span>
                  </a>
                </div>
              </div>

              {/* Business Address */}
              <div className="channel-group">
                <div className="channel-icon-wrap icon-pink">
                  <MapPin size={22} />
                </div>
                <div className="channel-details">
                  <span className="channel-title">Business Location</span>
                  <address className="business-address-text">
                    <strong>Dream Events</strong><br />
                    {BUSINESS_INFO.address.street},<br />
                    {BUSINESS_INFO.address.city} - {BUSINESS_INFO.address.pincode},<br />
                    {BUSINESS_INFO.address.state}, {BUSINESS_INFO.address.country}
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact Form & Map */}
          <div className="contact-form-col">
            <div className="quick-form-card glass-panel">
              <h3 className="form-box-title">Send a Quick Message</h3>
              <p className="form-box-subtitle">Fill in your inquiry and we will reply promptly via WhatsApp or phone call.</p>

              {status.error && (
                <div className="form-alert alert-error">
                  <AlertCircle size={16} />
                  <span>{status.error}</span>
                </div>
              )}

              {status.sent && (
                <div className="form-alert alert-success">
                  <CheckCircle2 size={16} />
                  <span>Opening WhatsApp to send your message!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="quick-message-form">
                <div className="input-field">
                  <label htmlFor="contact-name" className="field-label">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="field-input"
                    required
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="contact-phone" className="field-label">Phone Number</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="field-input"
                    required
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="contact-message" className="field-label">Your Message or Query</label>
                  <textarea
                    id="contact-message"
                    rows="3"
                    placeholder="Tell us about your event date, expected guests, or preferred food counters..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="field-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary-gold w-full">
                  <Send size={16} />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Google Map Embed for Villupuram Location */}
            <div className="map-embed-wrapper glass-panel">
              <div className="map-header">
                <MapPin size={16} className="text-gold" />
                <span>Our Location in Villupuram 605602</span>
              </div>
              <div className="map-iframe-container">
                <iframe
                  title="Dream Events Villupuram Location Map"
                  src="https://maps.google.com/maps?q=Thiruvalluvar+Nagar,+Virattikuppam+Road,+Villupuram+605602&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          position: relative;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 2.5rem;
          align-items: start;
        }

        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        .contact-info-card {
          padding: 2.5rem;
        }

        @media (max-width: 576px) {
          .contact-info-card {
            padding: 1.75rem;
          }
        }

        .info-card-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }

        .info-card-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .contact-channels {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .channel-group {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .channel-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-gold {
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
          border: 1px solid rgba(255, 215, 0, 0.35);
        }

        .icon-green {
          background: rgba(37, 211, 102, 0.15);
          color: #25D366;
          border: 1px solid rgba(37, 211, 102, 0.35);
        }

        .icon-pink {
          background: rgba(255, 46, 147, 0.15);
          color: #FF2E93;
          border: 1px solid rgba(255, 46, 147, 0.35);
        }

        .channel-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .channel-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
        }

        .channel-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .phones-vertical-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 0.25rem;
        }

        .clickable-phone-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.95rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .clickable-phone-link:hover {
          background: rgba(255, 215, 0, 0.12);
          border-color: rgba(255, 215, 0, 0.35);
          transform: translateX(4px);
        }

        .phone-num-val {
          font-size: 1rem;
          color: #FFD700;
          letter-spacing: 0.03em;
        }

        .phone-tag {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .contact-wa-btn {
          margin-top: 0.35rem;
          padding: 0.65rem 1.25rem;
          font-size: 0.88rem;
          align-self: flex-start;
        }

        .business-address-text {
          font-style: normal;
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .business-address-text strong {
          color: #FFFFFF;
        }

        /* Right Column Form & Map */
        .contact-form-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .quick-form-card {
          padding: 2.25rem;
        }

        @media (max-width: 576px) {
          .quick-form-card {
            padding: 1.5rem;
          }
        }

        .form-box-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
        }

        .form-box-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .form-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .alert-error {
          background: rgba(255, 46, 147, 0.15);
          border: 1px solid rgba(255, 46, 147, 0.4);
          color: #FF80BF;
        }

        .alert-success {
          background: rgba(0, 230, 118, 0.15);
          border: 1px solid rgba(0, 230, 118, 0.4);
          color: #69F0AE;
        }

        .quick-message-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .field-input, .field-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(12, 3, 27, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          color: #FFFFFF;
          font-size: 0.92rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .field-input:focus, .field-textarea:focus {
          border-color: #FFD700;
          box-shadow: 0 0 14px rgba(255, 215, 0, 0.2);
        }

        .field-textarea {
          resize: vertical;
        }

        .map-embed-wrapper {
          overflow: hidden;
          padding: 0;
          border-radius: var(--radius-lg);
        }

        .map-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.25rem;
          background: rgba(12, 3, 27, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.85rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .map-iframe-container {
          width: 100%;
          height: 240px;
        }

        .w-full {
          width: 100%;
        }
      `}</style>
    </section>
  );
}
