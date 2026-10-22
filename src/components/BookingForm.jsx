import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, Users, MapPin, Phone, Mail, User, Sparkles, 
  MessageSquare, AlertCircle, CheckCircle2, ChevronRight, RefreshCw
} from 'lucide-react';
import { BUSINESS_INFO, createWhatsAppBookingLink } from '../data/businessInfo';
import { SERVICES_DATA } from '../data/services';

export default function BookingForm({ preSelectedService, onClearPreSelected }) {
  // Today's date string in YYYY-MM-DD format for min attribute
  const todayDateString = new Date().toISOString().split('T')[0];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding & Reception',
    date: '',
    location: '',
    guests: '100 - 250 Guests',
    selectedServices: ['Chocolate Fountain', 'Fruit Salad', 'Welcome Drinks'],
    notes: ''
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  // Handle preSelectedService passed from ServiceCard, Modal, or CostEstimator
  useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => {
        let updatedServices = prev.selectedServices;
        if (preSelectedService.allServices && preSelectedService.allServices.length > 0) {
          updatedServices = Array.from(new Set([...prev.selectedServices, ...preSelectedService.allServices]));
        } else if (preSelectedService.name && !prev.selectedServices.includes(preSelectedService.name)) {
          updatedServices = [...prev.selectedServices, preSelectedService.name];
        }

        return {
          ...prev,
          selectedServices: updatedServices,
          guests: preSelectedService.guests || prev.guests
        };
      });
      if (onClearPreSelected) onClearPreSelected();
    }
  }, [preSelectedService, onClearPreSelected]);

  // Validation function
  const validate = () => {
    const errs = {};

    // Customer Name
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    // Phone Number (10 digits validation)
    const phoneClean = formData.phone.replace(/[\s\-()+]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for booking confirmation';
    } else if (!/^[6-9]\d{9}$/.test(phoneClean) && !/^\d{10,12}$/.test(phoneClean)) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    // Email (optional, but validate format if entered)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
    }

    // Event Date
    if (!formData.date) {
      errs.date = 'Please select your event date';
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.date = 'Event date cannot be in the past';
      }
    }

    // Event Location
    if (!formData.location.trim()) {
      errs.location = 'Please provide event hall, venue or city location';
    }

    // Required Services
    if (formData.selectedServices.length === 0) {
      errs.selectedServices = 'Please select at least one food service or counter';
    }

    return errs;
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field if any
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  // Toggle single service
  const handleServiceToggle = (serviceName) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(serviceName);
      const updated = exists 
        ? prev.selectedServices.filter(s => s !== serviceName)
        : [...prev.selectedServices, serviceName];
      return { ...prev, selectedServices: updated };
    });
    if (errors.selectedServices) {
      setErrors(prev => ({ ...prev, selectedServices: undefined }));
    }
  };

  // Select All / Deselect All
  const handleSelectAllServices = () => {
    const allNames = SERVICES_DATA.map(s => s.name);
    if (formData.selectedServices.length === allNames.length) {
      setFormData(prev => ({ ...prev, selectedServices: [] }));
    } else {
      setFormData(prev => ({ ...prev, selectedServices: allNames }));
    }
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      name: true,
      phone: true,
      date: true,
      location: true
    });

    if (Object.keys(validationErrors).length === 0) {
      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF2E93', '#00E676', '#9D4EDD', '#00E5FF']
        });
      } catch {
        // Fallback silently if canvas not supported
      }

      // Generate WhatsApp Direct Booking URL with details
      const generatedLink = createWhatsAppBookingLink(formData);
      setWhatsAppUrl(generatedLink);
      setIsSubmitted(true);
    } else {
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(`field-${firstErrorKey}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: 'Wedding & Reception',
      date: '',
      location: '',
      guests: '100 - 250 Guests',
      selectedServices: ['Chocolate Fountain', 'Fruit Salad', 'Welcome Drinks'],
      notes: ''
    });
    setErrors({});
    setTouched({});
  };

  return (
    <section id="booking" className="booking-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={16} />
            <span>Instant Celebration Enquiry</span>
          </div>
          <h2 className="section-title">
            Book Your <span className="text-gold-gradient">Dream Event Counters</span>
          </h2>
          <p className="section-subtitle">
            Fill in your celebration details below to reserve your date and prepare an instant WhatsApp enquiry for our Villupuram catering team.
          </p>
        </div>

        <div className="booking-card-wrapper">
          <div className="booking-card-inner glass-panel">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate className="booking-form">
                <div className="form-grid">
                  {/* Customer Name */}
                  <div className="form-group" id="field-name">
                    <label className="form-label" htmlFor="input-name">
                      <User size={16} className="label-icon" />
                      <span>Full Name <span className="required-star">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="input-name"
                      name="name"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.name && touched.name ? 'input-error' : ''}`}
                      required
                    />
                    {errors.name && touched.name && (
                      <span className="error-message">
                        <AlertCircle size={14} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="form-group" id="field-phone">
                    <label className="form-label" htmlFor="input-phone">
                      <Phone size={16} className="label-icon" />
                      <span>Mobile Number <span className="required-star">*</span></span>
                    </label>
                    <input
                      type="tel"
                      id="input-phone"
                      name="phone"
                      placeholder="e.g. 9488819134 (10 digits)"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.phone && touched.phone ? 'input-error' : ''}`}
                      required
                    />
                    {errors.phone && touched.phone && (
                      <span className="error-message">
                        <AlertCircle size={14} />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div className="form-group" id="field-email">
                    <label className="form-label" htmlFor="input-email">
                      <Mail size={16} className="label-icon" />
                      <span>Email Address <span className="optional-tag">(Optional)</span></span>
                    </label>
                    <input
                      type="email"
                      id="input-email"
                      name="email"
                      placeholder="e.g. yourname@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && (
                      <span className="error-message">
                        <AlertCircle size={14} />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Event Type */}
                  <div className="form-group" id="field-eventType">
                    <label className="form-label" htmlFor="select-eventType">
                      <Sparkles size={16} className="label-icon" />
                      <span>Event Type <span className="required-star">*</span></span>
                    </label>
                    <select
                      id="select-eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {BUSINESS_INFO.eventTypes.map((type, idx) => (
                        <option key={idx} value={type} className="select-opt">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Event Date (Prevent past dates) */}
                  <div className="form-group" id="field-date">
                    <label className="form-label" htmlFor="input-date">
                      <Calendar size={16} className="label-icon" />
                      <span>Event Date <span className="required-star">*</span></span>
                    </label>
                    <input
                      type="date"
                      id="input-date"
                      name="date"
                      min={todayDateString}
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.date && touched.date ? 'input-error' : ''}`}
                      required
                    />
                    {errors.date && touched.date && (
                      <span className="error-message">
                        <AlertCircle size={14} />
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Number of Guests */}
                  <div className="form-group" id="field-guests">
                    <label className="form-label" htmlFor="select-guests">
                      <Users size={16} className="label-icon" />
                      <span>Estimated Guests <span className="required-star">*</span></span>
                    </label>
                    <select
                      id="select-guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="50 - 100 Guests" className="select-opt">50 - 100 Guests (Intimate Gathering)</option>
                      <option value="100 - 250 Guests" className="select-opt">100 - 250 Guests (Standard Celebration)</option>
                      <option value="250 - 500 Guests" className="select-opt">250 - 500 Guests (Grand Reception)</option>
                      <option value="500 - 1000 Guests" className="select-opt">500 - 1000 Guests (Mega Wedding)</option>
                      <option value="1000+ Guests" className="select-opt">1000+ Guests (Large Carnival / Public Event)</option>
                    </select>
                  </div>

                  {/* Event Location */}
                  <div className="form-group full-width" id="field-location">
                    <label className="form-label" htmlFor="input-location">
                      <MapPin size={16} className="label-icon" />
                      <span>Event Location / Venue Details <span className="required-star">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="input-location"
                      name="location"
                      placeholder="e.g. Sri Krishna Marriage Hall, Virattikuppam Road, Villupuram"
                      value={formData.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.location && touched.location ? 'input-error' : ''}`}
                      required
                    />
                    {errors.location && touched.location && (
                      <span className="error-message">
                        <AlertCircle size={14} />
                        {errors.location}
                      </span>
                    )}
                  </div>

                  {/* Required Food Services (Interactive Multi-Select Checkbox Cards) */}
                  <div className="form-group full-width" id="field-selectedServices">
                    <div className="services-selection-header">
                      <label className="form-label">
                        <Sparkles size={16} className="label-icon" />
                        <span>Select Required Food Counters <span className="required-star">*</span></span>
                      </label>
                      <button
                        type="button"
                        className="toggle-all-btn"
                        onClick={handleSelectAllServices}
                      >
                        {formData.selectedServices.length === SERVICES_DATA.length ? 'Deselect All' : 'Select All 7 Services'}
                      </button>
                    </div>

                    <div className="services-checkbox-grid">
                      {SERVICES_DATA.map((service) => {
                        const isChecked = formData.selectedServices.includes(service.name);
                        return (
                          <label
                            key={service.id}
                            className={`service-check-item ${isChecked ? 'item-checked' : ''}`}
                          >
                            <input
                              type="checkbox"
                              name="services"
                              checked={isChecked}
                              onChange={() => handleServiceToggle(service.name)}
                              className="sr-only"
                            />
                            <div className="check-indicator">
                              {isChecked && <CheckCircle2 size={16} />}
                            </div>
                            <span className="check-service-name">{service.name}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.selectedServices && (
                      <span className="error-message">
                        <AlertCircle size={14} />
                        {errors.selectedServices}
                      </span>
                    )}
                  </div>

                  {/* Additional Requirements */}
                  <div className="form-group full-width" id="field-notes">
                    <label className="form-label" htmlFor="input-notes">
                      <span>Additional Requirements / Special Instructions</span>
                      <span className="optional-tag">(Optional)</span>
                    </label>
                    <textarea
                      id="input-notes"
                      name="notes"
                      rows="3"
                      placeholder="Share any special timing preferences, theme color requirements, or customized serving requests..."
                      value={formData.notes}
                      onChange={handleChange}
                      className="form-textarea"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="form-footer">
                  <div className="form-note">
                    <AlertCircle size={15} />
                    <span>Your booking enquiry will be prepared directly for instant WhatsApp verification or phone confirmation.</span>
                  </div>

                  <button type="submit" className="btn btn-primary-gold submit-btn">
                    <Sparkles size={18} />
                    <span>Generate WhatsApp Booking Enquiry</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </form>
            ) : (
              /* Success / WhatsApp Ready State */
              <div className="submission-success-card">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} className="text-green" />
                </div>

                <h3 className="success-title">Your Booking Enquiry is Ready!</h3>
                <p className="success-subtitle">
                  Thank you, <strong>{formData.name}</strong>! We have prepared your event details. Please click the button below to send your enquiry directly to Dream Events on WhatsApp.
                </p>

                {/* Enquiry Details Summary Card */}
                <div className="enquiry-summary-box">
                  <div className="summary-row">
                    <span className="summary-label">Customer Name:</span>
                    <strong className="summary-val">{formData.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Contact Number:</span>
                    <strong className="summary-val">{formData.phone}</strong>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Event Type:</span>
                    <strong className="summary-val">{formData.eventType}</strong>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Event Date:</span>
                    <strong className="summary-val text-gold">{formData.date}</strong>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Venue Location:</span>
                    <strong className="summary-val">{formData.location}</strong>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Estimated Guests:</span>
                    <strong className="summary-val">{formData.guests}</strong>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Selected Services ({formData.selectedServices.length}):</span>
                    <strong className="summary-val text-pink">
                      {formData.selectedServices.join(', ')}
                    </strong>
                  </div>
                  {formData.notes && (
                    <div className="summary-row">
                      <span className="summary-label">Special Notes:</span>
                      <strong className="summary-val">{formData.notes}</strong>
                    </div>
                  )}
                </div>

                {/* Action CTA Buttons */}
                <div className="success-actions">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp success-action-btn"
                  >
                    <MessageSquare size={20} />
                    <span>Send via WhatsApp to 94888 19134</span>
                  </a>

                  <a
                    href={`tel:${BUSINESS_INFO.primaryPhone}`}
                    className="btn btn-outline-gold success-action-btn"
                  >
                    <Phone size={18} />
                    <span>Call Directly (94888 19134)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="btn btn-glass"
                  >
                    <RefreshCw size={16} />
                    <span>Book Another Event</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .booking-section {
          position: relative;
        }

        .booking-card-wrapper {
          max-width: 960px;
          margin: 0 auto;
        }

        .booking-card-inner {
          padding: 3rem 2.5rem;
          background: rgba(23, 9, 51, 0.9);
          border: 1px solid rgba(255, 215, 0, 0.25);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 215, 0, 0.1);
        }

        @media (max-width: 768px) {
          .booking-card-inner {
            padding: 2rem 1.5rem;
          }
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .label-icon {
          color: #FFD700;
        }

        .required-star {
          color: #FF2E93;
        }

        .optional-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: normal;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.85rem 1.15rem;
          background: rgba(12, 3, 27, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-md);
          color: #FFFFFF;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #FFD700;
          box-shadow: 0 0 16px rgba(255, 215, 0, 0.25);
          background: rgba(16, 4, 36, 0.9);
        }

        .form-input.input-error {
          border-color: #FF2E93;
          background: rgba(255, 46, 147, 0.05);
        }

        .select-opt {
          background: #170933;
          color: #FFFFFF;
        }

        .form-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: #FF5C9D;
          font-weight: 500;
        }

        /* Checkbox Services Grid */
        .services-selection-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .toggle-all-btn {
          background: transparent;
          border: none;
          color: #FFD700;
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .toggle-all-btn:hover {
          color: #FFE082;
        }

        .services-checkbox-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        @media (max-width: 900px) {
          .services-checkbox-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 600px) {
          .services-checkbox-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .service-check-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 0.95rem;
          background: rgba(12, 3, 27, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .service-check-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 215, 0, 0.35);
        }

        .service-check-item.item-checked {
          background: rgba(255, 215, 0, 0.12);
          border-color: #FFD700;
          box-shadow: 0 0 12px rgba(255, 215, 0, 0.15);
        }

        .check-indicator {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFD700;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .item-checked .check-indicator {
          border-color: #FFD700;
          background: rgba(255, 215, 0, 0.2);
        }

        .check-service-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }

        .form-footer {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-align: center;
        }

        .submit-btn {
          width: 100%;
          max-width: 480px;
          padding: 1rem 2rem;
          font-size: 1.05rem;
        }

        /* Success Card View */
        .submission-success-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
        }

        .success-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0, 230, 118, 0.15);
          border: 2px solid #00E676;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(0, 230, 118, 0.35);
        }

        .text-green { color: #00E676; }
        .text-pink { color: #FF80BF; }

        .success-title {
          font-size: 2rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .success-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 620px;
          line-height: 1.6;
        }

        .enquiry-summary-box {
          width: 100%;
          max-width: 680px;
          background: rgba(12, 3, 27, 0.8);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.92rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
          padding-bottom: 0.5rem;
        }

        .summary-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .summary-label {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .summary-val {
          color: #FFFFFF;
          text-align: right;
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 480px;
          margin-top: 0.5rem;
        }

        .success-action-btn {
          width: 100%;
          padding: 1rem 1.5rem;
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
}
