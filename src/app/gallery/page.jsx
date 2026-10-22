'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Users, X, ChevronRight, Eye, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../../data/siteData';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold">Celebration Gallery</span>
          </div>

          <span className="badge-pill badge-gold">
            <Sparkles size={14} />
            Visual Portfolio of Real Events
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Celebration Moments & <span className="text-gold-gradient">Live Stall Displays</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            A glimpse into the weddings, banquets, birthdays, and festive celebrations we have proudly catered across Villupuram, Pondicherry, and beyond.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Category Filters */}
        <div className="gallery-filters">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item-card glass-panel"
              onClick={() => setSelectedPhoto(item)}
            >
              <div className="gallery-img-box">
                <img src={item.image} alt={item.title} />
                <div className="gallery-item-overlay">
                  <span className="gallery-cat-tag">{item.category}</span>
                  <div className="zoom-indicator">
                    <Eye size={18} />
                    <span>View Showcase</span>
                  </div>
                </div>
              </div>

              <div className="gallery-item-info">
                <h4>{item.title}</h4>
                <div className="item-meta">
                  <span><MapPin size={13} className="text-gold" /> {item.location}</span>
                  <span><Users size={13} className="text-cyan" /> {item.guests}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
            <div 
              className="lightbox-modal glass-panel modal-content-animated" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button" 
                className="lightbox-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="lightbox-image-container">
                <img src={selectedPhoto.image} alt={selectedPhoto.title} />
              </div>

              <div className="lightbox-details">
                <span className="badge-pill badge-gold">{selectedPhoto.category} Event Showcase</span>
                <h2>{selectedPhoto.title}</h2>
                <p className="lightbox-desc">{selectedPhoto.description}</p>

                <div className="lightbox-meta-row">
                  <div className="meta-block">
                    <MapPin size={16} className="text-gold" />
                    <span><strong>Venue:</strong> {selectedPhoto.location}</span>
                  </div>
                  <div className="meta-block">
                    <Users size={16} className="text-cyan" />
                    <span><strong>Guest Scale:</strong> {selectedPhoto.guests}</span>
                  </div>
                </div>

                <div className="lightbox-actions">
                  <Link 
                    href={`/book?service=${encodeURIComponent(selectedPhoto.title)}`} 
                    className="btn btn-primary-gold btn-lg"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    <Sparkles size={18} />
                    <span>Book Similar Setup</span>
                  </Link>

                  <button 
                    type="button" 
                    className="btn btn-outline-gold"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="gallery-cta-banner glass-panel">
          <div>
            <h3>Want a customized live counter aesthetic for your wedding?</h3>
            <p>Our creative team decorates stalls according to your wedding color palette and venue theme.</p>
          </div>
          <Link href="/book" className="btn btn-primary-gold btn-lg">
            <span>Inquire for Your Date</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .gallery-filters {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.6rem 1.4rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: #D6C9ED;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: #FFD700;
          color: #ffffff;
        }

        .filter-btn.active {
          background: var(--gold-gradient);
          color: #120427;
          border-color: #FFD700;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.35);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .gallery-item-card {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, border-color 0.3s;
        }

        .gallery-item-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 215, 0, 0.4);
        }

        .gallery-img-box {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .gallery-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .gallery-item-card:hover .gallery-img-box img {
          transform: scale(1.08);
        }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 3, 22, 0.6);
          opacity: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
          transition: opacity 0.3s;
        }

        .gallery-item-card:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-cat-tag {
          align-self: flex-start;
          background: rgba(10, 3, 22, 0.85);
          color: #FFD700;
          border: 1px solid rgba(255, 215, 0, 0.4);
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .zoom-indicator {
          align-self: center;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 215, 0, 0.9);
          color: #120427;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .gallery-item-info {
          padding: 1.25rem;
        }

        .gallery-item-info h4 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .item-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #A697C7;
          flex-wrap: wrap;
        }

        .item-meta span {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        /* Lightbox */
        .lightbox-modal {
          max-width: 850px;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #14072b;
          border-color: rgba(255, 215, 0, 0.4);
        }

        .lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .lightbox-image-container {
          height: 380px;
          width: 100%;
          background: #000000;
        }

        .lightbox-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lightbox-details {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .lightbox-details h2 {
          font-size: 1.6rem;
          font-weight: 800;
        }

        .lightbox-desc {
          color: #E2D9F3;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .lightbox-meta-row {
          display: flex;
          gap: 2rem;
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }

        .meta-block {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #ffffff;
        }

        .lightbox-actions {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .gallery-cta-banner {
          margin-top: 4rem;
          padding: 2.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          border-radius: 20px;
          border-color: rgba(255, 215, 0, 0.35);
        }

        .gallery-cta-banner h3 {
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }

        .gallery-cta-banner p {
          color: #E2D9F3;
          font-size: 0.92rem;
        }

        @media (max-width: 768px) {
          .lightbox-image-container {
            height: 240px;
          }
          .lightbox-details {
            padding: 1.5rem;
          }
          .gallery-cta-banner {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
