import React, { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import ServiceCard from './ServiceCard';

export default function ServiceGrid({ onViewDetails, onBookService }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Unique categories derived dynamically from the data
  const categories = useMemo(() => {
    const set = new Set(SERVICES_DATA.map(s => s.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered services rendered via .map()
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter(service => {
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="services-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={16} />
            <span>Celebration Stalls & Treats</span>
          </div>
          <h2 className="section-title">
            Our Signature <span className="text-gold-gradient">Food & Fun Services</span>
          </h2>
          <p className="section-subtitle">
            Explore our curated selection of interactive live food counters, gourmet sweet displays, and refreshing beverages designed to elevate your event in Villupuram.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="filter-controls-bar">
          {/* Category Tabs */}
          <div className="category-scroll-container">
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === "All" ? "All Services (7)" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="search-box-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search services (e.g., Chocolate, Beeda, Mocktails)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search services"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Service Grid: Rendered strictly via .map() */}
        {filteredServices.length > 0 ? (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={onViewDetails}
                onBookService={onBookService}
              />
            ))}
          </div>
        ) : (
          <div className="empty-search-state glass-panel">
            <p className="empty-title">No services found matching "{searchQuery}"</p>
            <p className="empty-subtitle">Try searching for other treats or view all services.</p>
            <button
              type="button"
              className="btn btn-outline-gold"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        .services-section {
          position: relative;
          background: linear-gradient(180deg, rgba(10, 3, 22, 0.5) 0%, rgba(20, 8, 44, 0.8) 50%, rgba(10, 3, 22, 0.5) 100%);
        }

        .filter-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .category-scroll-container {
          overflow-x: auto;
          padding-bottom: 0.5rem;
          max-width: 100%;
        }

        .category-scroll-container::-webkit-scrollbar {
          height: 4px;
        }

        .category-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.3);
          border-radius: var(--radius-full);
        }

        .category-pills {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          white-space: nowrap;
        }

        .category-pill {
          padding: 0.55rem 1.15rem;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .category-pill:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          border-color: rgba(255, 215, 0, 0.3);
        }

        .category-pill.active {
          background: var(--gold-gradient);
          color: #1a0833;
          font-weight: 700;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(255, 215, 0, 0.3);
        }

        .search-box-wrap {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 290px;
          flex-grow: 1;
          max-width: 400px;
        }

        @media (max-width: 768px) {
          .search-box-wrap {
            max-width: 100%;
            min-width: 100%;
          }
        }

        .search-icon {
          position: absolute;
          left: 1.1rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.65rem 2.5rem 0.65rem 2.85rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          color: #FFFFFF;
          font-size: 0.88rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: #FFD700;
          box-shadow: 0 0 16px rgba(255, 215, 0, 0.2);
        }

        .clear-search-btn {
          position: absolute;
          right: 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.85rem;
        }

        .clear-search-btn:hover {
          color: #FFFFFF;
        }

        /* 3-column Grid for cards */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1100px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        .empty-search-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .empty-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .empty-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
}
