'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="floating-wa-container">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="wa-tooltip-bubble">
          <div className="bubble-text">
            <strong>Plan Your Event?</strong>
            <span>Chat on WhatsApp: 94888 19134</span>
          </div>
          <button 
            type="button" 
            className="bubble-close-btn"
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss tooltip"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Pulsing WhatsApp CTA Button */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20Dream%20Events!%20I%20would%20like%20to%20enquire%20about%20catering%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        aria-label="Chat with Dream Events on WhatsApp"
      >
        <span className="wa-pulse-ring"></span>
        <div className="wa-icon-box">
          <MessageSquare size={28} />
        </div>
      </a>

      <style>{`
        .floating-wa-container {
          position: fixed;
          bottom: 1.75rem;
          right: 1.75rem;
          z-index: 800;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }

        .wa-tooltip-bubble {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(18, 5, 41, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(37, 211, 102, 0.4);
          padding: 0.65rem 0.95rem;
          border-radius: var(--radius-md);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
          animation: scaleUp 0.3s ease;
        }

        .bubble-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .bubble-text strong {
          font-size: 0.8rem;
          color: #25D366;
        }

        .bubble-text span {
          font-size: 0.72rem;
          color: #FFFFFF;
        }

        .bubble-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
          display: flex;
        }

        .bubble-close-btn:hover {
          color: #FFFFFF;
        }

        .floating-wa-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          text-decoration: none;
        }

        .wa-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.4);
          animation: pulseRing 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          z-index: 0;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.2;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .wa-icon-box {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #2bf075 0%, #128C7E 100%);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .floating-wa-btn:hover .wa-icon-box {
          transform: scale(1.1) rotate(6deg);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.7);
        }

        @media (max-width: 576px) {
          .floating-wa-container {
            bottom: 1.25rem;
            right: 1.25rem;
          }
          .floating-wa-btn {
            width: 52px;
            height: 52px;
          }
        }
      `}</style>
    </div>
  );
}
