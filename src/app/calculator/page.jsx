'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  Check, 
  Users, 
  Percent, 
  MessageSquare, 
  Printer, 
  ChevronRight,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { getStoredServicePrices } from '../../lib/storage';

export default function CalculatorPage() {
  const router = useRouter();

  const [guestCount, setGuestCount] = useState(300);
  const [customPrices, setCustomPrices] = useState({});

  useEffect(() => {
    setCustomPrices(getStoredServicePrices());
  }, []);

  // Merge live custom prices
  const activeServicesList = useMemo(() => {
    return SERVICES_DATA.map(s => ({
      ...s,
      basePrice: customPrices[s.id] !== undefined ? customPrices[s.id] : s.basePrice
    }));
  }, [customPrices]);
  const [selectedServices, setSelectedServices] = useState([
    'fruit-salad',
    'chocolate-fountain',
    'welcome-drinks'
  ]);
  const [addons, setAddons] = useState({
    dryIce: true,
    goldenLighting: true,
    uniformedStewards: false
  });

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length === 1) return; // Keep at least one stall selected
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculations
  const calculation = useMemo(() => {
    const selectedServiceObjects = activeServicesList.filter(s => 
      selectedServices.includes(s.id)
    );

    const basePerGuest = selectedServiceObjects.reduce((acc, curr) => acc + curr.basePrice, 0);
    const subtotal = basePerGuest * guestCount;

    // Bundle Discounts based on number of stalls
    let discountPercent = 0;
    if (selectedServices.length >= 5) discountPercent = 15;
    else if (selectedServices.length >= 3) discountPercent = 10;
    else if (selectedServices.length >= 2) discountPercent = 5;

    const discountAmount = Math.round((subtotal * discountPercent) / 100);

    // Addons cost
    let addonsTotal = 0;
    if (addons.dryIce) addonsTotal += 2500;
    if (addons.goldenLighting) addonsTotal += 3000;
    if (addons.uniformedStewards) addonsTotal += 4000;

    const finalTotal = subtotal - discountAmount + addonsTotal;
    const effectivePerGuest = Math.round(finalTotal / Math.max(1, guestCount));

    return {
      selectedServiceObjects,
      basePerGuest,
      subtotal,
      discountPercent,
      discountAmount,
      addonsTotal,
      finalTotal,
      effectivePerGuest
    };
  }, [guestCount, selectedServices, addons, activeServicesList]);

  const handleBookBlueprint = () => {
    const serviceNames = calculation.selectedServiceObjects.map(s => s.name).join(',');
    router.push(`/book?guests=${guestCount}&services=${encodeURIComponent(serviceNames)}&estimate=${calculation.finalTotal}`);
  };

  const handleWhatsAppBlueprint = () => {
    const servicesList = calculation.selectedServiceObjects.map(s => `• ${s.name}`).join('\n');
    const msg = `🎉 *DREAM EVENTS CUSTOM PACKAGE BLUEPRINT* 🎉
--------------------------------------
👥 *Estimated Guests:* ${guestCount} Guests
🍰 *Selected Live Stalls:*
${servicesList}

💰 *Estimated Budget:* ₹${calculation.finalTotal.toLocaleString('en-IN')} (approx. ₹${calculation.effectivePerGuest}/guest)
🎁 *Applied Combo Discount:* ${calculation.discountPercent}% OFF (-₹${calculation.discountAmount.toLocaleString('en-IN')})
--------------------------------------
I would like to discuss and confirm this package for my event.`;

    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="calculator-page">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold">Package & Cost Estimator</span>
          </div>

          <span className="badge-pill badge-gold">
            <Calculator size={14} />
            Real-Time Live Counter Budget Planner
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Event Package & <span className="text-gold-gradient">Cost Estimator</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Customize your celebratory stall setup, preview real-time per-guest rates with automatic bundle discounts, and generate an instant quotation.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="calculator-layout">
          {/* Controls Column */}
          <div className="calculator-controls">
            {/* Step 1: Guest Count Slider */}
            <div className="calc-card glass-panel">
              <div className="calc-card-header">
                <span className="step-tag">Step 1</span>
                <h3>Estimated Guest Count</h3>
              </div>

              <div className="guest-display" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <Users size={28} className="text-gold" />
                <input 
                  type="number" 
                  min="25" 
                  max="10000" 
                  step="25" 
                  value={guestCount} 
                  onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value)))}
                  className="guest-number-direct-input"
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    width: '180px',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 215, 0, 0.35)',
                    borderRadius: '12px',
                    color: '#FFD700',
                    outline: 'none',
                    padding: '0.2rem 0.5rem'
                  }}
                  title="Type your guest count directly or use the slider below"
                />
                <span className="guest-label" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#E2D9F3' }}>Guests</span>
              </div>

              <input 
                type="range" 
                min="50" 
                max="2000" 
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="guest-range-slider"
              />

              <div className="guest-presets">
                {[100, 250, 500, 800, 1200].map((num) => (
                  <button 
                    key={num} 
                    type="button"
                    className={`preset-btn ${guestCount === num ? 'active' : ''}`}
                    onClick={() => setGuestCount(num)}
                  >
                    {num} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Stall Selection */}
            <div className="calc-card glass-panel">
              <div className="calc-card-header">
                <div>
                  <span className="step-tag">Step 2</span>
                  <h3>Select Your Live Food Stalls</h3>
                </div>
                <span className="discount-pill">
                  {selectedServices.length >= 5 ? '15% VIP Bundle Applied' : 
                   selectedServices.length >= 3 ? '10% Multi-Stall Discount' : 
                   selectedServices.length >= 2 ? '5% Pair Discount' : 'Pick 2+ stalls for discounts'}
                </span>
              </div>

              <div className="stalls-selection-grid">
                {activeServicesList.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div 
                      key={service.id} 
                      className={`stall-select-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="stall-checkbox">
                        {isSelected && <Check size={14} color="#120427" strokeWidth={3} />}
                      </div>

                      <div className="stall-thumb">
                        <img src={service.image} alt={service.name} />
                      </div>

                      <div className="stall-info">
                        <h4>{service.name}</h4>
                        <span className="stall-tagline">{service.tagline}</span>
                        <div className="stall-rate text-gold">₹{service.basePrice}/guest</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-on Options */}
            <div className="calc-card glass-panel">
              <div className="calc-card-header">
                <span className="step-tag">Step 3</span>
                <h3>Premium Presentation Add-ons</h3>
              </div>

              <div className="addons-list">
                <label className="addon-row">
                  <input 
                    type="checkbox" 
                    checked={addons.dryIce} 
                    onChange={() => toggleAddon('dryIce')} 
                  />
                  <div className="addon-info">
                    <strong>Theatrical Dry-Ice Fog Effect</strong>
                    <span>Creates cinematic cool mist around mocktails & fruit counters (+₹2,500)</span>
                  </div>
                </label>

                <label className="addon-row">
                  <input 
                    type="checkbox" 
                    checked={addons.goldenLighting} 
                    onChange={() => toggleAddon('goldenLighting')} 
                  />
                  <div className="addon-info">
                    <strong>Ambient Golden Canopy & Uplighting</strong>
                    <span>Warm celebration spotlighting on all counter displays (+₹3,000)</span>
                  </div>
                </label>

                <label className="addon-row">
                  <input 
                    type="checkbox" 
                    checked={addons.uniformedStewards} 
                    onChange={() => toggleAddon('uniformedStewards')} 
                  />
                  <div className="addon-info">
                    <strong>Dedicated Table Roaming Stewards (2 Staff)</strong>
                    <span>Butler tray service delivering mocktails & paan directly to VIP seats (+₹4,000)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Live Summary Sidebar */}
          <aside className="calculator-summary">
            <div className="summary-card glass-panel">
              <div className="summary-header">
                <Crown size={22} className="text-gold" />
                <h3>Your Celebration Blueprint</h3>
              </div>

              <div className="summary-body">
                <div className="summary-row">
                  <span>Guest Count:</span>
                  <strong>{guestCount} Guests</strong>
                </div>

                <div className="summary-row">
                  <span>Selected Stalls:</span>
                  <strong>{calculation.selectedServiceObjects.length} {calculation.selectedServiceObjects.length === 1 ? 'Stall' : 'Stalls'}</strong>
                </div>

                <div className="selected-counters-chips">
                  {calculation.selectedServiceObjects.map(s => (
                    <span key={s.id} className="counter-chip">
                      {s.name} (₹{s.basePrice})
                    </span>
                  ))}
                </div>

                <div className="calc-divider" />

                <div className="summary-row">
                  <span>Base Counters Cost:</span>
                  <span>₹{calculation.subtotal.toLocaleString('en-IN')}</span>
                </div>

                {calculation.discountAmount > 0 && (
                  <div className="summary-row text-green">
                    <span>Bundle Discount ({calculation.discountPercent}%):</span>
                    <span>-₹{calculation.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {calculation.addonsTotal > 0 && (
                  <div className="summary-row">
                    <span>Presentation Add-ons:</span>
                    <span>+₹{calculation.addonsTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="calc-divider" />

                <div className="total-highlight-box">
                  <div className="total-label">Estimated Grand Total</div>
                  <div className="total-val text-gold-gradient">
                    ₹{calculation.finalTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="total-per-guest">
                    Approx. <strong>₹{calculation.effectivePerGuest}</strong> / guest
                  </div>
                </div>

                <div className="summary-actions">
                  <button 
                    type="button" 
                    className="btn btn-primary-gold btn-lg summary-btn"
                    onClick={handleBookBlueprint}
                  >
                    <Sparkles size={18} />
                    <span>Book This Blueprint</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-whatsapp summary-btn"
                    onClick={handleWhatsAppBlueprint}
                  >
                    <MessageSquare size={18} />
                    <span>Send Blueprint to WhatsApp</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-glass summary-btn"
                    onClick={() => window.print()}
                  >
                    <Printer size={16} />
                    <span>Print Quotation</span>
                  </button>
                </div>

                <div className="summary-guarantee">
                  <ShieldCheck size={16} className="text-green" />
                  <span>Transparent estimate. No hidden transport fees for Villupuram & Pondicherry.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .calculator-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2.5rem;
          align-items: flex-start;
        }

        .calculator-controls {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .calc-card {
          padding: 2.25rem;
          border-radius: 24px;
        }

        .calc-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .step-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #FFD700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.2rem;
        }

        .calc-card-header h3 {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .discount-pill {
          background: rgba(0, 230, 118, 0.15);
          color: #00E676;
          border: 1px solid rgba(0, 230, 118, 0.35);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        /* Guest slider */
        .guest-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          margin: 0.75rem 0 1.25rem;
        }

        .guest-number {
          font-size: 2.25rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: #ffffff;
          line-height: 1;
        }

        .guest-label {
          font-size: 1.1rem;
          color: #A697C7;
          font-weight: 600;
        }

        .guest-range-slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.15);
          outline: none;
          accent-color: #FFD700;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }

        .guest-presets {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .preset-btn {
          padding: 0.45rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #D6C9ED;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preset-btn:hover {
          border-color: #FFD700;
          color: #ffffff;
        }

        .preset-btn.active {
          background: var(--gold-gradient);
          color: #120427;
          border-color: #FFD700;
          font-weight: 700;
        }

        /* Stalls selection */
        .stalls-selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .stall-select-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.95rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.2s;
        }

        .stall-select-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 215, 0, 0.3);
        }

        .stall-select-card.selected {
          background: rgba(255, 215, 0, 0.1);
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }

        .stall-checkbox {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .stall-select-card.selected .stall-checkbox {
          background: #FFD700;
          border-color: #FFD700;
        }

        .stall-thumb {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .stall-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .stall-info {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .stall-info h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
        }

        .stall-tagline {
          font-size: 0.72rem;
          color: #A697C7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 130px;
        }

        .stall-rate {
          font-size: 0.82rem;
          font-weight: 700;
          margin-top: 0.2rem;
        }

        /* Addons */
        .addons-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .addon-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
        }

        .addon-row input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin-top: 3px;
          accent-color: #FFD700;
          cursor: pointer;
        }

        .addon-info {
          display: flex;
          flex-direction: column;
          line-height: 1.35;
        }

        .addon-info strong {
          font-size: 0.95rem;
          color: #ffffff;
        }

        .addon-info span {
          font-size: 0.8rem;
          color: #A697C7;
        }

        /* Summary Sidebar */
        .calculator-summary {
          position: sticky;
          top: 96px;
        }

        .summary-card {
          border-radius: 24px;
          padding: 2.25rem;
          border-color: rgba(255, 215, 0, 0.35);
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
        }

        .summary-header h3 {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .summary-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.92rem;
          color: #D6C9ED;
        }

        .summary-row strong {
          color: #ffffff;
        }

        .text-green {
          color: #00E676;
        }

        .selected-counters-chips {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .counter-chip {
          font-size: 0.74rem;
          padding: 0.2rem 0.55rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: #FFE082;
        }

        .calc-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0.35rem 0;
        }

        .total-highlight-box {
          background: rgba(14, 5, 33, 0.9);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          margin: 0.5rem 0;
        }

        .total-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #A697C7;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .total-val {
          font-size: 1.85rem;
          font-weight: 800;
          font-family: var(--font-heading);
          line-height: 1.2;
          margin: 0.25rem 0;
        }

        .total-per-guest {
          font-size: 0.85rem;
          color: #E2D9F3;
        }

        .summary-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .summary-btn {
          width: 100%;
        }

        .summary-guarantee {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #A697C7;
          line-height: 1.4;
          margin-top: 0.5rem;
        }

        @media (max-width: 992px) {
          .calculator-layout {
            grid-template-columns: 1fr;
          }
          .calculator-summary {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
