'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';
import { BUSINESS_INFO, createWhatsAppBookingLink } from '../../data/businessInfo';
import { saveBooking } from '../../lib/storage';

function BookingFormInner() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    eventType: 'Wedding & Reception',
    date: '',
    location: 'Villupuram',
    guests: '300',
    services: ['Fruit Salad', 'Chocolate Fountain'],
    notes: '',
    timing: 'Evening (6:00 PM - 10:00 PM)'
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passedEstimate, setPassedEstimate] = useState(null);

  // Prefill from search parameters
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const servicesParam = searchParams.get('services');
    const guestsParam = searchParams.get('guests');
    const estimateParam = searchParams.get('estimate');

    if (estimateParam) {
      setPassedEstimate(Number(estimateParam));
    }

    if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        services: [serviceParam]
      }));
    } else if (servicesParam) {
      const list = servicesParam.split(',').map(s => s.trim()).filter(Boolean);
      if (list.length > 0) {
        setFormData(prev => ({ ...prev, services: list }));
      }
    }

    if (guestsParam) {
      setFormData(prev => ({ ...prev, guests: guestsParam }));
    }
  }, [searchParams]);

  // Real-time live package amount calculation
  const calculation = useMemo(() => {
    const guestNum = Math.max(1, Number(formData.guests) || 100);
    const selectedObjs = SERVICES_DATA.filter(s => formData.services.includes(s.name) || formData.services.includes(s.id));
    const basePerGuest = selectedObjs.reduce((acc, curr) => acc + curr.basePrice, 0);
    const subtotal = basePerGuest * guestNum;

    let discountPercent = 0;
    if (selectedObjs.length >= 5) discountPercent = 15;
    else if (selectedObjs.length >= 3) discountPercent = 10;
    else if (selectedObjs.length >= 2) discountPercent = 5;

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const netTotal = subtotal - discountAmount;

    // If passed directly from calculator, respect it, otherwise use accurate live netTotal
    const finalAmount = (passedEstimate && passedEstimate > 0) ? passedEstimate : netTotal;

    return {
      subtotal,
      discountPercent,
      discountAmount,
      finalAmount,
      formattedAmount: `₹${finalAmount.toLocaleString('en-IN')}`
    };
  }, [formData.services, formData.guests, passedEstimate]);

  const toggleService = (serviceName) => {
    setPassedEstimate(null); // Recalculate dynamically on change
    setFormData(prev => {
      const exists = prev.services.includes(serviceName);
      if (exists) {
        if (prev.services.length === 1) return prev; // At least one
        return { ...prev, services: prev.services.filter(s => s !== serviceName) };
      } else {
        return { ...prev, services: [...prev.services, serviceName] };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'guests') setPassedEstimate(null); // Recalculate on guest count change
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `DE-2026-${randomRef}`;

    const newBooking = {
      id: bookingId,
      customerName: formData.name,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.date,
      eventLocation: formData.location,
      guestCount: Number(formData.guests),
      services: formData.services,
      notes: formData.notes,
      timing: formData.timing,
      estimatedTotal: calculation.formattedAmount,
      estimatedAmount: calculation.finalAmount,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save locally
    saveBooking(newBooking);

    // Call API route
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
    } catch (err) {
      console.warn('API sync fallback to local storage');
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setIsSubmitting(false);
    setBookingConfirmed(newBooking);
  };

  if (bookingConfirmed) {
    const waLink = createWhatsAppBookingLink({
      name: bookingConfirmed.customerName,
      phone: bookingConfirmed.phone,
      eventType: bookingConfirmed.eventType,
      date: bookingConfirmed.eventDate,
      location: bookingConfirmed.eventLocation,
      guests: bookingConfirmed.guestCount,
      services: bookingConfirmed.services,
      notes: bookingConfirmed.notes,
      estimatedTotal: bookingConfirmed.estimatedTotal
    });

    return (
      <div className="confirmation-card glass-panel modal-content-animated">
        <div className="confirm-icon-wrap">
          <Sparkles size={40} className="text-gold" />
        </div>

        <span className="badge-pill badge-gold">Inquiry Submitted Successfully</span>
        <h2 className="confirm-title">Congratulations, {bookingConfirmed.customerName}!</h2>
        <p className="confirm-subtitle">
          Your celebration inquiry has been recorded under Booking Reference:
        </p>

        <div className="reference-box">
          <span className="ref-label">Official Booking Reference:</span>
          <span className="ref-code text-gold-gradient">{bookingConfirmed.id}</span>
          <span className="ref-help">Save this ID to check status anytime on our Tracker</span>
        </div>

        <div className="booking-summary-strip">
          <div>
            <span className="summary-label">Date & Timing</span>
            <strong>{bookingConfirmed.eventDate} ({bookingConfirmed.timing})</strong>
          </div>
          <div>
            <span className="summary-label">Scale</span>
            <strong>{bookingConfirmed.guestCount} Guests</strong>
          </div>
          <div>
            <span className="summary-label">Package Amount</span>
            <strong className="text-gold-gradient" style={{ fontSize: '1.05rem' }}>{bookingConfirmed.estimatedTotal}</strong>
          </div>
          <div>
            <span className="summary-label">Venue</span>
            <strong>{bookingConfirmed.eventLocation}</strong>
          </div>
        </div>

        <div className="confirm-services-list">
          <span className="services-title">Selected Stalls ({bookingConfirmed.services.length}):</span>
          <div className="services-badges">
            {bookingConfirmed.services.map((s, idx) => (
              <span key={idx} className="service-chip">✦ {s}</span>
            ))}
          </div>
        </div>

        <div className="confirm-actions">
          <a 
            href={waLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg confirm-btn"
          >
            <MessageSquare size={20} />
            <span>Confirm Now on WhatsApp (Instant Response)</span>
          </a>

          <Link href={`/track?ref=${bookingConfirmed.id}`} className="btn btn-outline-gold confirm-btn">
            <span>View Live Tracking Status</span>
            <ArrowRight size={18} />
          </Link>

          <Link href="/" className="btn btn-glass confirm-btn">
            Return to Homepage
          </Link>
        </div>

        <style jsx>{`
          .confirmation-card {
            max-width: 680px;
            margin: 2rem auto;
            padding: 3.5rem 2.5rem;
            text-align: center;
            border-radius: 28px;
            border-color: rgba(255, 215, 0, 0.4);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .confirm-icon-wrap {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.15);
            border: 2px solid #FFD700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
          }

          .confirm-title {
            font-size: 2.2rem;
            font-weight: 800;
            margin: 1rem 0 0.5rem;
          }

          .confirm-subtitle {
            font-size: 1rem;
            color: #CBBEE2;
            margin-bottom: 1.5rem;
          }

          .reference-box {
            background: rgba(14, 5, 33, 0.9);
            border: 1px solid rgba(255, 215, 0, 0.35);
            padding: 1.25rem 2rem;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            width: 100%;
            margin-bottom: 2rem;
          }

          .ref-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            color: #A697C7;
          }

          .ref-code {
            font-size: 2.2rem;
            font-weight: 900;
            font-family: var(--font-heading);
            letter-spacing: 0.05em;
          }

          .ref-help {
            font-size: 0.75rem;
            color: #E2D9F3;
          }

          .booking-summary-strip {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            width: 100%;
            background: rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            text-align: left;
          }

          .summary-label {
            display: block;
            font-size: 0.75rem;
            color: #A697C7;
            text-transform: uppercase;
          }

          .booking-summary-strip strong {
            font-size: 0.9rem;
            color: #ffffff;
          }

          .confirm-services-list {
            width: 100%;
            text-align: left;
            margin-bottom: 2rem;
          }

          .services-title {
            font-size: 0.85rem;
            color: #FFE082;
            font-weight: 700;
            text-transform: uppercase;
            display: block;
            margin-bottom: 0.5rem;
          }

          .services-badges {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .service-chip {
            padding: 0.35rem 0.85rem;
            background: rgba(255, 215, 0, 0.1);
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 9999px;
            font-size: 0.82rem;
            color: #FFD700;
          }

          .confirm-actions {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
            width: 100%;
          }

          .confirm-btn {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="booking-form-wrapper glass-panel">
      {/* Steps indicator */}
      <div className="form-steps-nav">
        <button 
          type="button" 
          className={`step-nav-btn ${step === 1 ? 'active' : ''}`}
          onClick={() => setStep(1)}
        >
          <span className="step-num">1</span>
          <span>Event Essentials</span>
        </button>

        <button 
          type="button" 
          className={`step-nav-btn ${step === 2 ? 'active' : ''}`}
          onClick={() => setStep(2)}
        >
          <span className="step-num">2</span>
          <span>Live Stalls</span>
        </button>

        <button 
          type="button" 
          className={`step-nav-btn ${step === 3 ? 'active' : ''}`}
          onClick={() => setStep(3)}
        >
          <span className="step-num">3</span>
          <span>Host Details</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="booking-actual-form">
        {/* STEP 1: EVENT DETAILS */}
        {step === 1 && (
          <div className="form-step-pane">
            <h3 className="step-heading">
              <Calendar size={20} className="text-gold" />
              Event Date, Scale & Location
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label>Event Type</label>
                <select 
                  name="eventType" 
                  value={formData.eventType} 
                  onChange={handleInputChange}
                  required
                >
                  {BUSINESS_INFO.eventTypes.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Estimated Guests</label>
                <select 
                  name="guests" 
                  value={formData.guests} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="100">100 Guests</option>
                  <option value="200">200 Guests</option>
                  <option value="300">300 Guests (Standard)</option>
                  <option value="500">500 Guests (Grand)</option>
                  <option value="800">800 Guests</option>
                  <option value="1200">1,200+ Guests (Mega)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Event Date</label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Setup Timing</label>
                <select 
                  name="timing" 
                  value={formData.timing} 
                  onChange={handleInputChange}
                >
                  <option value="Morning (8:00 AM - 1:00 PM)">Morning (8:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="Evening (6:00 PM - 10:00 PM)">Evening (6:00 PM - 10:00 PM)</option>
                  <option value="Full Day Event">Full Day Event</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Event Location / Venue Hall</label>
              <input 
                type="text" 
                name="location" 
                placeholder="e.g. Thiruvalluvar Nagar / Kalyana Mandapam, Villupuram" 
                value={formData.location} 
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-nav-actions">
              <span />
              <button 
                type="button" 
                className="btn btn-primary-gold"
                onClick={() => setStep(2)}
              >
                <span>Continue to Select Stalls</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: STALLS SELECTION */}
        {step === 2 && (
          <div className="form-step-pane">
            <h3 className="step-heading">
              <Sparkles size={20} className="text-gold" />
              Choose Your Signature Live Counters
            </h3>
            <p className="step-desc">Select one or more live stations for your event:</p>

            <div className="stalls-checklist-grid">
              {SERVICES_DATA.map((service) => {
                const isChecked = formData.services.includes(service.name);
                return (
                  <label 
                    key={service.id} 
                    className={`stall-check-item ${isChecked ? 'active' : ''}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => toggleService(service.name)}
                    />
                    <img src={service.image} alt={service.name} className="stall-thumb-small" />
                    <div className="stall-label-col">
                      <strong>{service.name}</strong>
                      <span>{service.category} • ₹{service.basePrice}/guest</span>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <div className="step-live-price-bar glass-panel">
                <div className="live-price-info">
                  <span className="live-price-label">Live Package Estimate:</span>
                  <strong className="live-price-value text-gold-gradient">{calculation.formattedAmount}</strong>
                  <span className="live-price-sub">({formData.guests} Guests • {formData.services.length} Stalls)</span>
                </div>
                {calculation.discountPercent > 0 && (
                  <span className="step-discount-badge">{calculation.discountPercent}% Combo Discount Applied</span>
                )}
              </div>

              <label style={{ marginTop: '1rem' }}>Special Instructions or Diet Requirements (Optional)</label>
              <textarea 
                name="notes" 
                rows="3" 
                placeholder="Mention any custom flavours, venue access restrictions, dry ice preference, etc."
                value={formData.notes} 
                onChange={handleInputChange}
              />
            </div>

            <div className="form-nav-actions">
              <button 
                type="button" 
                className="btn btn-glass"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              <button 
                type="button" 
                className="btn btn-primary-gold"
                onClick={() => setStep(3)}
              >
                <span>Continue to Host Details</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT INFORMATION */}
        {step === 3 && (
          <div className="form-step-pane">
            <h3 className="step-heading">
              <User size={20} className="text-gold" />
              Host & Contact Information
            </h3>
            <p className="step-desc">Where should we send your booking quotation & package details?</p>

            <div className="form-group">
              <label>Host / Family Representative Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="e.g. Senthil Nathan" 
                value={formData.name} 
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number (For Call & SMS)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="e.g. 94888 19134" 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>WhatsApp Number (If different)</label>
                <input 
                  type="tel" 
                  name="whatsapp" 
                  placeholder="e.g. 91235 90148" 
                  value={formData.whatsapp} 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address (Optional)</label>
              <input 
                type="email" 
                name="email" 
                placeholder="e.g. yourname@gmail.com" 
                value={formData.email} 
                onChange={handleInputChange}
              />
            </div>

            {/* Quick Summary review */}
            <div className="review-box">
              <div className="review-title">Booking Summary Review</div>
              <div className="review-line">
                <span>Event:</span>
                <strong>{formData.eventType} on {formData.date || 'TBD'}</strong>
              </div>
              <div className="review-line">
                <span>Stalls:</span>
                <strong>{formData.services.join(', ')}</strong>
              </div>
              <div className="review-line">
                <span>Guests:</span>
                <strong>{formData.guests} Guests</strong>
              </div>
              <div className="review-line amount-highlight-line" style={{ paddingTop: '0.5rem', marginTop: '0.5rem', borderTop: '1px dashed rgba(255, 215, 0, 0.3)' }}>
                <span style={{ fontSize: '1rem', color: '#FFE082', fontWeight: 600 }}>Estimated Package Total:</span>
                <strong className="text-gold-gradient" style={{ fontSize: '1.35rem', fontWeight: 800 }}>{calculation.formattedAmount}</strong>
              </div>
              {calculation.discountPercent > 0 && (
                <div className="review-line text-green" style={{ fontSize: '0.82rem' }}>
                  <span>Combo Discount ({calculation.discountPercent}%):</span>
                  <span>-₹{calculation.discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <div className="form-nav-actions">
              <button 
                type="button" 
                className="btn btn-glass"
                onClick={() => setStep(2)}
              >
                Back
              </button>

              <button 
                type="submit" 
                className="btn btn-primary-gold btn-lg submit-booking-btn"
                disabled={isSubmitting}
              >
                <Sparkles size={18} />
                <span>{isSubmitting ? 'Securing Booking...' : 'Submit & Confirm Booking'}</span>
              </button>
            </div>
          </div>
        )}
      </form>

      <style jsx>{`
        .booking-form-wrapper {
          border-radius: 24px;
          overflow: hidden;
          padding: 2.5rem;
          border-color: rgba(255, 215, 0, 0.35);
        }

        .form-steps-nav {
          display: flex;
          gap: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .step-nav-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #A697C7;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .step-nav-btn.active {
          background: rgba(255, 215, 0, 0.12);
          border-color: #FFD700;
          color: #FFD700;
        }

        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .step-nav-btn.active .step-num {
          background: #FFD700;
          color: #120427;
          font-weight: 800;
        }

        .step-heading {
          font-size: 1.4rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .step-desc {
          color: #A697C7;
          font-size: 0.92rem;
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
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
        .form-group select,
        .form-group textarea {
          padding: 0.85rem 1rem;
          background: rgba(10, 3, 22, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }

        .form-group select option {
          background: #14072b;
          color: #ffffff;
        }

        /* Stalls checklist */
        .stalls-checklist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .stall-check-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.2s;
        }

        .stall-check-item.active {
          background: rgba(255, 215, 0, 0.1);
          border-color: #FFD700;
        }

        .stall-check-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #FFD700;
        }

        .stall-thumb-small {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          object-fit: cover;
        }

        .stall-label-col {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .stall-label-col strong {
          font-size: 0.92rem;
          color: #ffffff;
        }

        .stall-label-col span {
          font-size: 0.72rem;
          color: #A697C7;
        }

        .review-box {
          background: rgba(255, 215, 0, 0.06);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .review-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #FFD700;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .review-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          margin-bottom: 0.25rem;
        }

        .review-line span {
          color: #A697C7;
        }

        .review-line strong {
          color: #ffffff;
        }

        .step-live-price-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-radius: 14px;
          border-color: rgba(255, 215, 0, 0.35);
          background: rgba(255, 215, 0, 0.06);
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .live-price-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .live-price-label {
          font-size: 0.88rem;
          color: #E2D7F5;
          font-weight: 600;
        }

        .live-price-value {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .live-price-sub {
          font-size: 0.8rem;
          color: #A697C7;
        }

        .step-discount-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #00E676;
          background: rgba(0, 230, 118, 0.12);
          border: 1px solid rgba(0, 230, 118, 0.35);
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .form-nav-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px) {
          .booking-form-wrapper {
            padding: 1.5rem;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .form-steps-nav {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="booking-page">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold">Book Your Celebration</span>
          </div>

          <span className="badge-pill badge-gold">
            <Sparkles size={14} />
            Online Reservation & Custom Package Blueprint
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Book Your Event <span className="text-gold-gradient">Live Counters</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Reserve your wedding, birthday, or festival date. Receive an instant booking reference and direct WhatsApp coordinator confirmation.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="booking-page-grid">
          <div className="form-column">
            <Suspense fallback={<div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>Loading booking engine...</div>}>
              <BookingFormInner />
            </Suspense>
          </div>

          {/* Sidebar Guarantee */}
          <aside className="booking-info-sidebar">
            <div className="info-card glass-panel">
              <h3>Dream Events Guarantee</h3>
              <div className="guarantee-points">
                <div className="g-point">
                  <ShieldCheck size={20} className="text-green" />
                  <div>
                    <strong>Date Lock Guarantee</strong>
                    <p>Once confirmed, your booking slot is 100% reserved exclusively for your event.</p>
                  </div>
                </div>

                <div className="g-point">
                  <Clock size={20} className="text-gold" />
                  <div>
                    <strong>Early Setup Policy</strong>
                    <p>Equipment and fresh ingredients arrive 60-90 minutes prior to ceremony start.</p>
                  </div>
                </div>

                <div className="g-point">
                  <Users size={20} className="text-cyan" />
                  <div>
                    <strong>Uniformed Live Crew</strong>
                    <p>Dressed attendants handle crowd serving with full hygiene gear.</p>
                  </div>
                </div>
              </div>

              <div className="direct-call-box">
                <p>Prefer to book over the phone?</p>
                <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="direct-phone-link">
                  <Phone size={18} />
                  <span>+91 94888 19134</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .booking-page-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
          align-items: flex-start;
        }

        .info-card {
          padding: 2.25rem;
          border-radius: 24px;
        }

        .info-card h3 {
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .guarantee-points {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .g-point {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
        }

        .g-point strong {
          display: block;
          font-size: 0.95rem;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }

        .g-point p {
          font-size: 0.82rem;
          color: #CBBEE2;
          line-height: 1.5;
        }

        .direct-call-box {
          background: rgba(255, 215, 0, 0.08);
          border: 1px solid rgba(255, 215, 0, 0.25);
          padding: 1.25rem;
          border-radius: 14px;
          text-align: center;
        }

        .direct-call-box p {
          font-size: 0.82rem;
          color: #A697C7;
          margin-bottom: 0.4rem;
        }

        .direct-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #00E676;
          font-weight: 800;
          font-size: 1.1rem;
        }

        @media (max-width: 992px) {
          .booking-page-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
