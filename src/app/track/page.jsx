'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  Phone, 
  MessageSquare, 
  ChevronRight,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { getStoredBookings } from '../../lib/storage';
import { BUSINESS_INFO } from '../../data/businessInfo';

function TrackBookingInner() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [query, setQuery] = useState(initialRef);
  const [matchedBookings, setMatchedBookings] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialRef) {
      handleSearch(initialRef);
    }
  }, [initialRef]);

  const handleSearch = (searchVal = query) => {
    const clean = searchVal.trim().toLowerCase();
    if (!clean) return;

    const allBookings = getStoredBookings();
    const results = allBookings.filter(b => 
      b.id.toLowerCase().includes(clean) || 
      b.phone.includes(clean) ||
      (b.customerName && b.customerName.toLowerCase().includes(clean))
    );

    setMatchedBookings(results);
    setSearched(true);
  };

  const getStatusStep = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'staff assigned': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  return (
    <div className="track-booking-wrapper">
      {/* Search Input Box */}
      <div className="track-search-card glass-panel">
        <h3>Enter Your Booking Reference or Phone Number</h3>
        <p>Example: <strong>DE-2026-7841</strong> or <strong>9842103948</strong></p>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="search-form"
        >
          <div className="search-input-wrap">
            <Search size={20} className="search-icon text-gold" />
            <input 
              type="text" 
              placeholder="Search by Booking ID or Mobile Phone..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="track-input"
            />
          </div>

          <button type="submit" className="btn btn-primary-gold track-submit-btn">
            <Search size={18} />
            <span>Track Booking</span>
          </button>
        </form>
      </div>

      {/* Results Section */}
      {searched && (
        <div className="results-container">
          {matchedBookings.length === 0 ? (
            <div className="not-found-card glass-panel">
              <ShieldAlert size={40} className="text-pink" />
              <h3>No Booking Found for "{query}"</h3>
              <p>Please double check your 10-digit mobile number or booking reference code (e.g. DE-2026-XXXX).</p>
              <div className="not-found-actions">
                <a 
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events,%20I%20am%20checking%20my%20booking%20status%20for%20query:%20${encodeURIComponent(query)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  <span>Check with Coordinator on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bookings-list">
              {matchedBookings.map((b) => {
                const stepNum = getStatusStep(b.status);
                return (
                  <div key={b.id} className="booking-result-card glass-panel">
                    <div className="card-top-header">
                      <div className="ref-badge-col">
                        <span className="ref-label">Booking Reference</span>
                        <h2 className="ref-code text-gold-gradient">{b.id}</h2>
                      </div>
                      <span className={`status-pill status-${b.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        ● {b.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="timeline-tracker">
                      <div className={`timeline-step ${stepNum >= 1 ? 'completed' : ''}`}>
                        <div className="step-circle">{stepNum > 1 ? '✓' : '1'}</div>
                        <span>Inquiry Received</span>
                      </div>
                      <div className={`timeline-line ${stepNum >= 2 ? 'filled' : ''}`} />

                      <div className={`timeline-step ${stepNum >= 2 ? 'completed' : ''}`}>
                        <div className="step-circle">{stepNum > 2 ? '✓' : '2'}</div>
                        <span>Date Confirmed</span>
                      </div>
                      <div className={`timeline-line ${stepNum >= 3 ? 'filled' : ''}`} />

                      <div className={`timeline-step ${stepNum >= 3 ? 'completed' : ''}`}>
                        <div className="step-circle">{stepNum > 3 ? '✓' : '3'}</div>
                        <span>Crew Assigned</span>
                      </div>
                      <div className={`timeline-line ${stepNum >= 4 ? 'filled' : ''}`} />

                      <div className={`timeline-step ${stepNum >= 4 ? 'completed' : ''}`}>
                        <div className="step-circle">4</div>
                        <span>Celebrated</span>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="booking-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Client Name</span>
                        <strong>{b.customerName}</strong>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Phone Contact</span>
                        <strong>{b.phone}</strong>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Event Type</span>
                        <strong>{b.eventType}</strong>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Celebration Date</span>
                        <strong>{b.eventDate} ({b.timing || 'Evening'})</strong>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Location / Hall</span>
                        <strong>{b.eventLocation}</strong>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Estimated Scale</span>
                        <strong>{b.guestCount} Guests</strong>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Package Amount</span>
                        <strong className="text-gold-gradient" style={{ fontSize: '1.05rem' }}>{b.estimatedTotal || 'Custom Package Quote'}</strong>
                      </div>
                    </div>

                    {/* Stalls selected */}
                    <div className="stalls-chip-row">
                      <span className="chip-label">Reserved Stalls:</span>
                      <div className="chips-container">
                        {b.services?.map((s, idx) => (
                          <span key={idx} className="stall-chip">✦ {s}</span>
                        ))}
                      </div>
                    </div>

                    {b.notes && (
                      <div className="notes-box">
                        <span className="notes-label">Special Host Instructions:</span>
                        <p>{b.notes}</p>
                      </div>
                    )}

                    {b.adminNote && (
                      <div className="admin-notes-box">
                        <span className="notes-label">Dream Events Coordinator Update:</span>
                        <p>{b.adminNote}</p>
                      </div>
                    )}

                    {/* Quick coordinator contact */}
                    <div className="card-actions">
                      <a 
                        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20Checking%20in%20regarding%20booking%20reference%20${b.id}%20for%20${encodeURIComponent(b.customerName)}.`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                      >
                        <MessageSquare size={16} />
                        <span>Chat Regarding {b.id}</span>
                      </a>

                      <a 
                        href={`tel:${BUSINESS_INFO.primaryPhone}`} 
                        className="btn btn-glass"
                      >
                        <Phone size={16} />
                        <span>Call Support: +91 94888 19134</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .track-search-card {
          max-width: 760px;
          margin: 0 auto 3rem;
          padding: 2.5rem;
          border-radius: 24px;
          text-align: center;
        }

        .track-search-card h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }

        .track-search-card p {
          color: #A697C7;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .search-form {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-input-wrap {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1.25rem;
          pointer-events: none;
        }

        .track-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.25rem;
          background: rgba(10, 3, 22, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          color: #ffffff;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .track-input:focus {
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }

        .track-submit-btn {
          flex-shrink: 0;
        }

        /* Results */
        .not-found-card {
          max-width: 650px;
          margin: 0 auto;
          padding: 3rem;
          text-align: center;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .not-found-card h3 {
          font-size: 1.35rem;
          font-weight: 800;
        }

        .not-found-card p {
          color: #CBBEE2;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 820px;
          margin: 0 auto;
        }

        .booking-result-card {
          padding: 2.5rem;
          border-radius: 24px;
          border-color: rgba(255, 215, 0, 0.35);
        }

        .card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .ref-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #A697C7;
          letter-spacing: 0.05em;
        }

        .ref-code {
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.1;
        }

        .status-pill {
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .status-pending {
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
          border: 1px solid rgba(255, 215, 0, 0.4);
        }

        .status-confirmed {
          background: rgba(0, 230, 118, 0.15);
          color: #00E676;
          border: 1px solid rgba(0, 230, 118, 0.4);
        }

        .status-staff-assigned {
          background: rgba(0, 229, 255, 0.15);
          color: #00E5FF;
          border: 1px solid rgba(0, 229, 255, 0.4);
        }

        .status-completed {
          background: rgba(157, 78, 221, 0.2);
          color: #D8B4FE;
          border: 1px solid rgba(157, 78, 221, 0.4);
        }

        /* Timeline tracker */
        .timeline-tracker {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          padding: 1.5rem 1rem;
          background: rgba(14, 5, 33, 0.85);
          border-radius: 16px;
        }

        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 1;
        }

        .step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #A697C7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
        }

        .timeline-step.completed .step-circle {
          background: #00E676;
          border-color: #00E676;
          color: #120427;
        }

        .timeline-step span {
          font-size: 0.75rem;
          color: #A697C7;
          font-weight: 600;
          text-align: center;
        }

        .timeline-step.completed span {
          color: #ffffff;
        }

        .timeline-line {
          flex: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 0.5rem 1.25rem;
        }

        .timeline-line.filled {
          background: #00E676;
        }

        /* Details grid */
        .booking-details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          font-size: 0.75rem;
          color: #A697C7;
          text-transform: uppercase;
        }

        .detail-item strong {
          font-size: 0.95rem;
          color: #ffffff;
        }

        .stalls-chip-row {
          margin-bottom: 1.5rem;
        }

        .chip-label {
          font-size: 0.8rem;
          color: #FFE082;
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
        }

        .chips-container {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .stall-chip {
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          color: #FFD700;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .notes-box,
        .admin-notes-box {
          padding: 1.25rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .notes-box {
          background: rgba(255, 255, 255, 0.04);
          border-left: 3px solid #FFE082;
        }

        .admin-notes-box {
          background: rgba(0, 230, 118, 0.08);
          border-left: 3px solid #00E676;
        }

        .notes-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: #A697C7;
          display: block;
          margin-bottom: 0.25rem;
        }

        .card-actions {
          display: flex;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .booking-result-card {
            padding: 1.5rem;
          }
          .search-form {
            flex-direction: column;
          }
          .track-submit-btn {
            width: 100%;
          }
          .booking-details-grid {
            grid-template-columns: 1fr;
          }
          .timeline-tracker {
            flex-direction: column;
            gap: 1rem;
          }
          .timeline-line {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="track-page">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold">Track Booking Status</span>
          </div>

          <span className="badge-pill badge-gold">
            <Sparkles size={14} />
            Live Client Portal & Status Check
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Track Your Event <span className="text-gold-gradient">Reservation</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Check the real-time coordinator review status, crew assignment, and event itinerary for your celebration.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <Suspense fallback={<div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>Loading status tracker...</div>}>
          <TrackBookingInner />
        </Suspense>
      </div>
    </div>
  );
}
