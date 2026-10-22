'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { getStoredAnnouncement } from '../lib/storage';

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setAnnouncement(getStoredAnnouncement());
  }, []);

  if (!announcement || !announcement.enabled || dismissed) return null;

  return (
    <div className="announcement-strip">
      <div className="container announcement-inner">
        <div className="announcement-msg">
          <span className="live-dot" />
          <span className="announcement-tag">{announcement.badge || 'Offer'}</span>
          <span className="announcement-title">{announcement.text}</span>
          {announcement.linkUrl && (
            <Link href={announcement.linkUrl} className="announcement-action">
              <span>{announcement.linkText || 'Details'}</span>
              <ArrowRight size={12} />
            </Link>
          )}
        </div>
        <button 
          type="button" 
          className="close-strip-btn" 
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
        >
          <X size={13} />
        </button>
      </div>

      <style jsx>{`
        .announcement-strip {
          background: linear-gradient(90deg, #1f0742 0%, #3b0764 40%, #1e0942 100%);
          border-bottom: 1px solid rgba(255, 215, 0, 0.2);
          color: #ffffff;
          font-size: 0.8rem;
          padding: 0.35rem 1rem;
          position: relative;
          z-index: 102;
        }

        .announcement-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
        }

        .announcement-msg {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin: 0 auto;
          flex-wrap: wrap;
          justify-content: center;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFD700;
          box-shadow: 0 0 8px #FFD700;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .announcement-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #FFD700;
          letter-spacing: 0.05em;
          background: rgba(255, 215, 0, 0.12);
          padding: 0.1rem 0.5rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .announcement-title {
          color: #F1EAFF;
          font-weight: 500;
        }

        .announcement-action {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #FFE082;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }

        .announcement-action:hover {
          color: #ffffff;
        }

        .close-strip-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0.2rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .close-strip-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 768px) {
          .announcement-msg {
            font-size: 0.75rem;
            gap: 0.45rem;
          }
          .announcement-title {
            max-width: 260px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </div>
  );
}
