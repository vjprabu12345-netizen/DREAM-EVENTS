'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Search, Star, CheckCircle2, Clock, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../../data/services';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = selectedCategory === 'All Services' || service.category === selectedCategory;
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="services-page">
      {/* Page Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold">Services & Stalls</span>
          </div>

          <span className="badge-pill badge-gold">
            <Sparkles size={14} />
            Full Event Stall Catalog
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Our Signature <span className="text-gold-gradient">Celebration Live Counters</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Explore all 7 handcrafted live food stations. Equipped with commercial culinary machines, certified hygiene gear, and dressed hospitality attendants.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Search & Category Filter Toolbar */}
        <div className="filter-toolbar glass-panel">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search stalls (e.g., Chocolate, Paan, Mocktails, Popcorn)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
              >
                Clear
              </button>
            )}
          </div>

          <div className="category-pills">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Listing */}
        {filteredServices.length === 0 ? (
          <div className="empty-results glass-panel">
            <p>No live stalls matched your search term "<strong>{searchQuery}</strong>".</p>
            <button 
              type="button" 
              className="btn btn-outline-gold btn-sm"
              onClick={() => { setSelectedCategory('All Services'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="services-detail-grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="service-detail-card glass-panel">
                <div className="card-media">
                  <img src={service.image} alt={service.name} className="service-img" />
                  <div className="media-overlay">
                    <span className="cat-badge">{service.category}</span>
                    <div className="rating-pill">
                      <Star size={13} fill="#FFD700" color="#FFD700" />
                      <span>{service.rating} ({service.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="body-header">
                    <div>
                      <h2 className="service-title">{service.name}</h2>
                      <p className="service-tagline text-gold">{service.tagline}</p>
                    </div>
                    <div className="price-tag">
                      <span className="price-label">Starting From</span>
                      <strong className="price-amount">₹{service.basePrice}</strong>
                      <span className="price-unit">/ guest</span>
                    </div>
                  </div>

                  <p className="service-description">{service.detailedDescription}</p>

                  <div className="service-specs-row">
                    <div className="spec-badge">
                      <Clock size={14} className="text-gold" />
                      <span>Setup: {service.setupTime}</span>
                    </div>
                    <div className="spec-badge">
                      <Users size={14} className="text-cyan" />
                      <span>Capacity: {service.servingCapacity}</span>
                    </div>
                  </div>

                  <div className="features-checklist">
                    <h4 className="checklist-title">Key Inclusions & Highlights:</h4>
                    <ul>
                      {service.features.map((feat, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={15} className="check-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-footer-actions">
                    <Link href={`/services/${service.slug}`} className="btn btn-outline-gold">
                      <span>View Specifications</span>
                      <ArrowRight size={16} />
                    </Link>

                    <Link href={`/book?service=${encodeURIComponent(service.name)}`} className="btn btn-primary-gold">
                      <Sparkles size={16} />
                      <span>Book Counter</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Need Multiple Stalls Banner */}
        <div className="combo-banner glass-panel">
          <div className="combo-text">
            <h3>Planning a Grand Event with Multiple Stalls?</h3>
            <p>Save up to 15% when you bundle 3 or more live counters into a customized celebration blueprint!</p>
          </div>
          <div className="combo-actions">
            <Link href="/calculator" className="btn btn-primary-gold btn-lg">
              <Sparkles size={18} />
              <span>Use Package Estimator</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter-toolbar {
          padding: 1.5rem;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-radius: 20px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1.25rem;
          color: #A697C7;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.95rem 1rem 0.95rem 3rem;
          background: rgba(10, 3, 22, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-input:focus {
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }

        .clear-search-btn {
          position: absolute;
          right: 1.25rem;
          background: transparent;
          border: none;
          color: #A697C7;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .clear-search-btn:hover {
          color: #ffffff;
        }

        .category-pills {
          display: flex;
          gap: 0.65rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          flex-wrap: wrap;
        }

        .category-pill {
          padding: 0.5rem 1.15rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: #D6C9ED;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .category-pill:hover {
          border-color: rgba(255, 215, 0, 0.4);
          color: #ffffff;
        }

        .category-pill.active {
          background: var(--gold-gradient);
          color: #120427;
          border-color: #FFD700;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .empty-results {
          text-align: center;
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .services-detail-grid {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .service-detail-card {
          display: grid;
          grid-template-columns: 360px 1fr;
          border-radius: 24px;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }

        .service-detail-card:hover {
          border-color: rgba(255, 215, 0, 0.35);
          transform: translateY(-4px);
        }

        .card-media {
          position: relative;
          min-height: 320px;
        }

        .service-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(10, 3, 22, 0.85) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
        }

        .cat-badge {
          align-self: flex-start;
          background: rgba(10, 3, 22, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 215, 0, 0.3);
          color: #FFD700;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.8rem;
          border-radius: 9999px;
        }

        .rating-pill {
          align-self: flex-start;
          background: rgba(10, 3, 22, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: #ffffff;
          font-weight: 700;
        }

        .card-body {
          padding: 2rem 2.5rem;
          display: flex;
          flex-direction: column;
        }

        .body-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .service-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .service-tagline {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .price-tag {
          text-align: right;
          background: rgba(255, 215, 0, 0.08);
          border: 1px solid rgba(255, 215, 0, 0.25);
          padding: 0.5rem 0.85rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          flex-shrink: 0;
        }

        .price-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #A697C7;
          font-weight: 700;
        }

        .price-amount {
          font-size: 1.25rem;
          font-weight: 800;
          color: #FFD700;
          font-family: var(--font-heading);
        }

        .price-unit {
          font-size: 0.72rem;
          color: #E2D9F3;
        }

        .service-description {
          font-size: 0.92rem;
          color: #CBBEE2;
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }

        .service-specs-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .spec-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .features-checklist {
          margin-bottom: 1.75rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .checklist-title {
          font-size: 0.85rem;
          color: #FFE082;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.65rem;
          font-weight: 700;
        }

        .features-checklist ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 1.5rem;
        }

        .features-checklist li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #E2D9F3;
          line-height: 1.4;
        }

        .check-icon {
          color: #00E676;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .card-footer-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .combo-banner {
          margin-top: 4rem;
          padding: 2.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(123, 44, 191, 0.3) 0%, rgba(255, 215, 0, 0.15) 100%);
          border-color: rgba(255, 215, 0, 0.35);
        }

        .combo-text h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }

        .combo-text p {
          color: #E2D9F3;
          font-size: 0.95rem;
        }

        @media (max-width: 992px) {
          .service-detail-card {
            grid-template-columns: 1fr;
          }
          .card-media {
            height: 240px;
          }
          .card-body {
            padding: 1.5rem;
          }
          .features-checklist ul {
            grid-template-columns: 1fr;
          }
          .combo-banner {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
