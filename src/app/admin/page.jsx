'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Key, 
  Search, 
  Plus, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Trash2, 
  Edit3, 
  Download, 
  RefreshCw, 
  ChevronRight, 
  Sparkles, 
  Megaphone, 
  Eye, 
  X,
  Lock,
  Unlock,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { 
  getStoredBookings, 
  updateBookingStatus, 
  deleteBooking, 
  saveBooking, 
  resetSampleBookings,
  getStoredInquiries,
  getStoredAnnouncement,
  saveAnnouncement,
  getStoredServicePrices,
  saveServicePrice,
  resetServicePrices
} from '../../lib/storage';
import { SERVICES_DATA } from '../../data/services';
import { BUSINESS_INFO } from '../../data/businessInfo';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'new-booking' | 'services' | 'announcement' | 'inquiries'

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal detail view
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Announcement state
  const [announcementForm, setAnnouncementForm] = useState({
    enabled: true,
    badge: 'Festive Offer',
    text: 'Special 10% Discount on All 7-Stall Combined Wedding Packages!',
    linkText: 'Check Estimator',
    linkUrl: '/calculator'
  });
  const [announcementSaved, setAnnouncementSaved] = useState(false);

  // New offline booking form
  const [newBookingData, setNewBookingData] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'Wedding & Reception',
    eventDate: '',
    eventLocation: 'Villupuram',
    guestCount: 300,
    services: ['Fruit Salad', 'Chocolate Fountain'],
    notes: '',
    status: 'Confirmed'
  });
  const [newBookingCreated, setNewBookingCreated] = useState(false);

  // Inquiries
  const [inquiries, setInquiries] = useState([]);

  // Stalls price state
  const [servicePrices, setServicePrices] = useState({});
  const [priceUpdateNotice, setPriceUpdateNotice] = useState(null);

  // Check persisted auth
  useEffect(() => {
    const savedAuth = localStorage.getItem('dream_events_admin_authed');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load data
  const refreshData = () => {
    setBookings(getStoredBookings());
    setInquiries(getStoredInquiries());
    setAnnouncementForm(getStoredAnnouncement());
    setServicePrices(getStoredServicePrices());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleUpdatePrice = (serviceId, newPrice) => {
    const val = Number(newPrice);
    if (!isNaN(val) && val >= 0) {
      saveServicePrice(serviceId, val);
      setServicePrices(prev => ({ ...prev, [serviceId]: val }));
      setPriceUpdateNotice(`Updated rate for ${serviceId} to ₹${val}/guest!`);
      setTimeout(() => setPriceUpdateNotice(null), 2500);
    }
  };

  const handleResetAllPrices = () => {
    if (confirm('Reset all stall rates back to catalog defaults?')) {
      resetServicePrices();
      setServicePrices({});
      setPriceUpdateNotice('Reset all rates to catalog defaults!');
      setTimeout(() => setPriceUpdateNotice(null), 2500);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'dreamevents' || passcode === '1234') {
      setIsAuthenticated(true);
      setPasscodeError(false);
      localStorage.setItem('dream_events_admin_authed', 'true');
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dream_events_admin_authed');
  };

  // Status changer
  const handleStatusChange = (id, newStatus) => {
    updateBookingStatus(id, newStatus);
    refreshData();
  };

  // Save admin note
  const handleSaveNote = (id) => {
    updateBookingStatus(id, bookings.find(b => b.id === id)?.status || 'Pending', noteText);
    setEditingNoteId(null);
    refreshData();
  };

  // Delete booking
  const handleDeleteBooking = (id) => {
    if (confirm(`Are you sure you want to remove booking ${id}?`)) {
      deleteBooking(id);
      refreshData();
    }
  };

  // Create new booking
  const handleCreateNewBooking = (e) => {
    e.preventDefault();
    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const newEntry = {
      ...newBookingData,
      id: `DE-2026-${randomRef}`,
      estimatedTotal: newBookingData.estimatedTotal || `₹${(Number(newBookingData.guestCount || 300) * 180).toLocaleString('en-IN')}`,
      createdAt: new Date().toISOString()
    };
    saveBooking(newEntry);
    setNewBookingCreated(true);
    refreshData();
    setTimeout(() => {
      setNewBookingCreated(false);
      setActiveTab('bookings');
    }, 1500);
  };

  // Save Announcement
  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    saveAnnouncement(announcementForm);
    setAnnouncementSaved(true);
    setTimeout(() => setAnnouncementSaved(false), 2500);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Booking ID,Customer Name,Phone,Email,Event Type,Event Date,Location,Guests,Services,Estimated Total,Status,Notes\n'];
    const rows = bookings.map(b => {
      const srv = Array.isArray(b.services) ? b.services.join(';') : b.services;
      return `"${b.id}","${b.customerName}","${b.phone}","${b.email || ''}","${b.eventType}","${b.eventDate}","${b.eventLocation}","${b.guestCount}","${srv}","${b.estimatedTotal || ''}","${b.status}","${b.notes || ''}"\n`;
    });
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dream_events_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON
  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(bookings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dream_events_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Staff Assigned').length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    
    // Accurate revenue sum from actual booking amounts
    const approxRevenue = bookings.reduce((acc, curr) => {
      if (curr.estimatedAmount && Number(curr.estimatedAmount) > 0) {
        return acc + Number(curr.estimatedAmount);
      }
      if (curr.estimatedTotal && typeof curr.estimatedTotal === 'string') {
        const parsed = parseInt(curr.estimatedTotal.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(parsed) && parsed > 0) return acc + parsed;
      }
      const baseGuests = Number(curr.guestCount) || 200;
      const stallsCount = Array.isArray(curr.services) ? curr.services.length : 2;
      return acc + (baseGuests * stallsCount * 40);
    }, 0);

    return { total, pending, confirmed, completed, approxRevenue };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
      const clean = searchQuery.toLowerCase();
      const matchesSearch = 
        b.id.toLowerCase().includes(clean) ||
        b.customerName.toLowerCase().includes(clean) ||
        b.phone.includes(clean) ||
        b.eventLocation.toLowerCase().includes(clean);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, statusFilter, searchQuery]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="login-card glass-panel modal-content-animated">
          <div className="admin-icon-circle">
            <Lock size={32} className="text-gold" />
          </div>
          <span className="badge-pill badge-gold">Staff Security Portal</span>
          <h2>Dream Events Admin Dashboard</h2>
          <p className="login-sub">Enter the administrative passkey to manage bookings, stalls, and client inquiries.</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-input-wrap">
              <Key size={18} className="key-icon" />
              <input 
                type="password" 
                placeholder="Enter admin passkey (Hint: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                required
              />
            </div>

            {passcodeError && (
              <div className="login-error">
                <AlertCircle size={16} />
                <span>Incorrect passkey. Please try: admin123</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary-gold btn-lg login-btn">
              <Unlock size={18} />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="login-footer">
            <Link href="/" className="back-home-link">
              &larr; Return to Dream Events Public Website
            </Link>
          </div>
        </div>

        <style jsx>{`
          .admin-login-screen {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .login-card {
            max-width: 480px;
            width: 100%;
            padding: 3rem 2.5rem;
            border-radius: 24px;
            text-align: center;
            border-color: rgba(255, 215, 0, 0.35);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .admin-icon-circle {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.15);
            border: 2px solid #FFD700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
          }

          .login-card h2 {
            font-size: 1.6rem;
            font-weight: 800;
            margin: 0.75rem 0 0.5rem;
          }

          .login-sub {
            font-size: 0.9rem;
            color: #CBBEE2;
            margin-bottom: 2rem;
            line-height: 1.5;
          }

          .login-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .login-input-wrap {
            position: relative;
            display: flex;
            align-items: center;
          }

          .key-icon {
            position: absolute;
            left: 1rem;
            color: #FFD700;
          }

          .login-input-wrap input {
            width: 100%;
            padding: 0.95rem 1rem 0.95rem 2.85rem;
            background: rgba(10, 3, 22, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            color: #ffffff;
            font-size: 1rem;
            outline: none;
          }

          .login-input-wrap input:focus {
            border-color: #FFD700;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.25);
          }

          .login-error {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #F87171;
            font-size: 0.85rem;
            background: rgba(239, 68, 68, 0.15);
            padding: 0.6rem;
            border-radius: 8px;
            border: 1px solid rgba(239, 68, 68, 0.3);
          }

          .login-btn {
            width: 100%;
          }

          .login-footer {
            margin-top: 1.75rem;
          }

          .back-home-link {
            font-size: 0.85rem;
            color: #A697C7;
            transition: color 0.2s;
          }

          .back-home-link:hover {
            color: #FFD700;
          }
        `}</style>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="admin-dashboard-page">
      {/* Admin Top Bar */}
      <div className="admin-header-strip">
        <div className="container admin-header-flex">
          <div className="admin-header-title">
            <div className="admin-shield-badge">
              <Shield size={20} className="text-gold" />
            </div>
            <div>
              <h1 className="admin-title">Dream Events Management Console</h1>
              <p className="admin-sub">Villupuram Operations Desk & Booking Engine</p>
            </div>
          </div>

          <div className="admin-header-actions">
            <button 
              type="button" 
              className="btn btn-glass btn-sm"
              onClick={refreshData}
              title="Refresh Data"
            >
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>

            <button 
              type="button" 
              className="btn btn-outline-gold btn-sm"
              onClick={handleLogout}
            >
              <Lock size={14} />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container section-padding" style={{ paddingTop: '2rem' }}>
        {/* Metric Cards Row */}
        <div className="admin-metrics-grid">
          <div className="metric-box glass-panel">
            <div className="metric-meta">
              <span className="metric-label">Total Inquiries</span>
              <h3 className="metric-val">{metrics.total}</h3>
            </div>
            <div className="metric-icon-wrap icon-gold">
              <Calendar size={22} />
            </div>
          </div>

          <div className="metric-box glass-panel">
            <div className="metric-meta">
              <span className="metric-label">Action Needed (Pending)</span>
              <h3 className="metric-val text-gold">{metrics.pending}</h3>
            </div>
            <div className="metric-icon-wrap icon-pink">
              <Clock size={22} />
            </div>
          </div>

          <div className="metric-box glass-panel">
            <div className="metric-meta">
              <span className="metric-label">Confirmed / Dispatched</span>
              <h3 className="metric-val text-green">{metrics.confirmed}</h3>
            </div>
            <div className="metric-icon-wrap icon-green">
              <CheckCircle2 size={22} />
            </div>
          </div>

          <div className="metric-box glass-panel">
            <div className="metric-meta">
              <span className="metric-label">Pipeline Value</span>
              <h3 className="metric-val text-gold-gradient">₹{metrics.approxRevenue.toLocaleString('en-IN')}</h3>
            </div>
            <div className="metric-icon-wrap icon-cyan">
              <Sparkles size={22} />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs-nav">
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={16} />
            <span>Bookings & Inquiries ({bookings.length})</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'new-booking' ? 'active' : ''}`}
            onClick={() => setActiveTab('new-booking')}
          >
            <Plus size={16} />
            <span>Record Offline Booking</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Sparkles size={16} />
            <span>Stall Catalog</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'announcement' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcement')}
          >
            <Megaphone size={16} />
            <span>Announcement Bar</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <MessageSquare size={16} />
            <span>Contact Messages ({inquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: ALL BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div className="tab-pane">
            {/* Filter toolbar */}
            <div className="admin-filter-bar glass-panel">
              <div className="admin-search-wrap">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Filter by Name, Phone, or Booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div className="status-filter-pills">
                {['All', 'Pending', 'Confirmed', 'Staff Assigned', 'Completed'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`status-btn ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="export-btn-group">
                <button 
                  type="button" 
                  className="btn btn-glass btn-sm"
                  onClick={exportToCSV}
                  title="Export to CSV Spreadsheet"
                >
                  <FileSpreadsheet size={15} />
                  <span>CSV</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-glass btn-sm"
                  onClick={exportToJSON}
                  title="Export to JSON Backup"
                >
                  <Download size={15} />
                  <span>JSON</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-glass btn-sm"
                  onClick={() => {
                    if (confirm('Reset to initial sample demo data? Any custom bookings will be restored.')) {
                      resetSampleBookings();
                      refreshData();
                    }
                  }}
                  title="Reset Demo Data"
                >
                  <RefreshCw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Bookings Table / Cards */}
            {filteredBookings.length === 0 ? (
              <div className="empty-bookings-box glass-panel">
                <p>No bookings found matching current filters.</p>
              </div>
            ) : (
              <div className="bookings-cards-stack">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="admin-booking-row glass-panel">
                    <div className="row-col-primary">
                      <div className="booking-ref-strip">
                        <strong className="row-ref-code text-gold-gradient">{b.id}</strong>
                        <span className="row-date-badge">
                          <Calendar size={13} /> {b.eventDate}
                        </span>
                        <span className="row-amount-badge">
                          💰 {b.estimatedTotal || '₹' + ((Number(b.guestCount) || 200) * 180).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <h3 className="row-client-name">{b.customerName}</h3>

                      <div className="row-meta-sub">
                        <span><Phone size={13} className="text-green" /> {b.phone}</span>
                        <span>•</span>
                        <span>{b.eventType}</span>
                        <span>•</span>
                        <span>{b.guestCount} Guests</span>
                        <span>•</span>
                        <span>{b.eventLocation}</span>
                      </div>

                      <div className="row-stalls-tags">
                        {Array.isArray(b.services) && b.services.map((s, idx) => (
                          <span key={idx} className="small-stall-tag">✦ {s}</span>
                        ))}
                      </div>

                      {b.notes && (
                        <div className="row-host-notes">
                          <em>Note:</em> {b.notes}
                        </div>
                      )}

                      {/* Inline Note Editor */}
                      {editingNoteId === b.id ? (
                        <div className="inline-note-editor">
                          <input 
                            type="text" 
                            placeholder="Add coordinator notes or staff assignments..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            autoFocus
                          />
                          <button 
                            type="button" 
                            className="btn btn-primary-gold btn-sm"
                            onClick={() => handleSaveNote(b.id)}
                          >
                            Save
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-glass btn-sm"
                            onClick={() => setEditingNoteId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : b.adminNote ? (
                        <div className="row-admin-note">
                          <span>Staff Note: {b.adminNote}</span>
                          <button 
                            type="button" 
                            className="edit-note-btn"
                            onClick={() => { setEditingNoteId(b.id); setNoteText(b.adminNote); }}
                          >
                            <Edit3 size={12} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          className="add-note-btn"
                          onClick={() => { setEditingNoteId(b.id); setNoteText(''); }}
                        >
                          + Add Staff Note
                        </button>
                      )}
                    </div>

                    <div className="row-col-actions">
                      <div className="status-selector-wrap">
                        <label>Event Status:</label>
                        <select 
                          value={b.status} 
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className={`admin-status-dropdown status-select-${b.status.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <option value="Pending">Pending Review</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Staff Assigned">Staff Assigned</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="row-quick-buttons">
                        <a 
                          href={`https://wa.me/91${b.phone}?text=Hi%20${encodeURIComponent(b.customerName)},%20this%20is%20Dream%20Events%20regarding%20your%20celebration%20booking%20${b.id}.`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp btn-sm"
                          title="Open WhatsApp chat with client"
                        >
                          <MessageSquare size={14} />
                          <span>WhatsApp</span>
                        </a>

                        <a 
                          href={`tel:${b.phone}`} 
                          className="btn btn-glass btn-sm"
                          title="Call client"
                        >
                          <Phone size={14} />
                          <span>Call</span>
                        </a>

                        <button 
                          type="button" 
                          className="btn btn-glass btn-sm"
                          onClick={() => setSelectedBookingModal(b)}
                          title="Full Details"
                        >
                          <Eye size={14} />
                        </button>

                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteBooking(b.id)}
                          title="Delete booking"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NEW OFFLINE BOOKING */}
        {activeTab === 'new-booking' && (
          <div className="tab-pane">
            <div className="new-booking-form-card glass-panel">
              <div className="card-top">
                <h3>Record Offline Phone Call or Walk-In Booking</h3>
                <p>Instantly generates a booking record that can be tracked on the client portal.</p>
              </div>

              {newBookingCreated && (
                <div className="booking-created-notice">
                  <CheckCircle2 size={20} className="text-green" />
                  <span>Booking successfully recorded into system! Redirecting...</span>
                </div>
              )}

              <form onSubmit={handleCreateNewBooking} className="offline-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh V"
                      value={newBookingData.customerName}
                      onChange={(e) => setNewBookingData({ ...newBookingData, customerName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Customer Mobile Phone</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9842100000"
                      value={newBookingData.phone}
                      onChange={(e) => setNewBookingData({ ...newBookingData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Event Type</label>
                    <select 
                      value={newBookingData.eventType}
                      onChange={(e) => setNewBookingData({ ...newBookingData, eventType: e.target.value })}
                    >
                      {BUSINESS_INFO.eventTypes.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Event Date</label>
                    <input 
                      type="date" 
                      value={newBookingData.eventDate}
                      onChange={(e) => setNewBookingData({ ...newBookingData, eventDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Estimated Guests</label>
                    <input 
                      type="number" 
                      value={newBookingData.guestCount}
                      onChange={(e) => setNewBookingData({ ...newBookingData, guestCount: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Venue Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Thiruvalluvar Nagar / Sri Krishna Mahal, Villupuram"
                    value={newBookingData.eventLocation}
                    onChange={(e) => setNewBookingData({ ...newBookingData, eventLocation: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Selected Stalls</label>
                  <div className="checkboxes-row">
                    {SERVICES_DATA.map((s) => {
                      const isChecked = newBookingData.services.includes(s.name);
                      return (
                        <label key={s.id} className="offline-checkbox-label">
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => {
                              const updated = isChecked
                                ? newBookingData.services.filter(x => x !== s.name)
                                : [...newBookingData.services, s.name];
                              setNewBookingData({ ...newBookingData, services: updated });
                            }}
                          />
                          <span>{s.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label>Agreed / Estimated Amount (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹45,000 or 45000"
                    value={newBookingData.estimatedTotal || ''}
                    onChange={(e) => setNewBookingData({ 
                      ...newBookingData, 
                      estimatedTotal: e.target.value.startsWith('₹') ? e.target.value : (e.target.value ? '₹' + e.target.value : '') 
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Coordinator Internal Notes</label>
                  <textarea 
                    rows="3"
                    placeholder="Advance paid, special dry-ice requests, timing notes..."
                    value={newBookingData.notes}
                    onChange={(e) => setNewBookingData({ ...newBookingData, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary-gold btn-lg">
                  <Plus size={18} />
                  <span>Save Offline Booking to Database</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: STALLS CATALOG & LIVE PRICING MANAGER */}
        {activeTab === 'services' && (
          <div className="tab-pane">
            <div className="stalls-admin-header glass-panel" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.25rem' }}>Live Stalls & Rate Management</h3>
                <p style={{ fontSize: '0.85rem', color: '#A697C7' }}>Edit live rates per guest. Changes immediately update across the Calculator, Booking Form, and Stalls Catalog.</p>
              </div>
              <button 
                type="button" 
                className="btn btn-glass btn-sm"
                onClick={handleResetAllPrices}
                title="Reset all prices to defaults"
              >
                <RefreshCw size={14} />
                <span>Reset to Catalog Defaults</span>
              </button>
            </div>

            {priceUpdateNotice && (
              <div className="booking-created-notice" style={{ marginBottom: '1.5rem' }}>
                <CheckCircle2 size={20} className="text-green" />
                <span>{priceUpdateNotice}</span>
              </div>
            )}

            <div className="services-admin-grid">
              {SERVICES_DATA.map((service) => {
                const currentPrice = servicePrices[service.id] !== undefined ? servicePrices[service.id] : service.basePrice;
                return (
                  <div key={service.id} className="service-admin-card glass-panel">
                    <img src={service.image} alt={service.name} className="service-admin-thumb" />
                    <div className="service-admin-info">
                      <h4>{service.name}</h4>
                      <span className="text-gold">{service.category}</span>
                      
                      <div className="admin-rate-editor-box">
                        <label className="rate-editor-label">Live Rate (₹ / guest):</label>
                        <div className="rate-input-group">
                          <span className="rate-currency">₹</span>
                          <input 
                            type="number" 
                            defaultValue={currentPrice}
                            key={currentPrice}
                            min="0"
                            step="5"
                            className="rate-number-input"
                            id={`rate-${service.id}`}
                          />
                          <button 
                            type="button" 
                            className="btn btn-primary-gold btn-sm"
                            onClick={() => {
                              const input = document.getElementById(`rate-${service.id}`);
                              if (input) handleUpdatePrice(service.id, input.value);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      <p className="admin-cap">Capacity: {service.servingCapacity}</p>
                      <div className="service-status-tag status-active">
                        ● Active & Available for Booking
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ANNOUNCEMENT BAR CONFIG */}
        {activeTab === 'announcement' && (
          <div className="tab-pane">
            <div className="announcement-config-card glass-panel">
              <h3>Site-wide Announcement Banner</h3>
              <p>Updates the live broadcast strip displayed at the top of every page.</p>

              {announcementSaved && (
                <div className="booking-created-notice">
                  <CheckCircle2 size={20} className="text-green" />
                  <span>Announcement banner settings saved and published site-wide!</span>
                </div>
              )}

              <form onSubmit={handleSaveAnnouncement} className="announcement-form">
                <label className="toggle-switch-label">
                  <input 
                    type="checkbox" 
                    checked={announcementForm.enabled}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, enabled: e.target.checked })}
                  />
                  <strong>Enable Banner on Website Header</strong>
                </label>

                <div className="form-group">
                  <label>Banner Badge Label</label>
                  <input 
                    type="text" 
                    value={announcementForm.badge}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, badge: e.target.value })}
                    placeholder="e.g. Festive Offer / Wedding Season"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Banner Text Message</label>
                  <input 
                    type="text" 
                    value={announcementForm.text}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, text: e.target.value })}
                    placeholder="e.g. Special 10% Discount on Wedding packages this month!"
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Action Link Text</label>
                    <input 
                      type="text" 
                      value={announcementForm.linkText}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, linkText: e.target.value })}
                      placeholder="e.g. Check Estimator"
                    />
                  </div>

                  <div className="form-group">
                    <label>Target Page Link</label>
                    <input 
                      type="text" 
                      value={announcementForm.linkUrl}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, linkUrl: e.target.value })}
                      placeholder="e.g. /calculator or /book"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary-gold btn-lg">
                  <Megaphone size={18} />
                  <span>Publish Announcement Banner</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="tab-pane">
            <div className="inquiries-panel glass-panel">
              <h3>Website Contact Form Messages</h3>
              <p>Direct inquiries submitted through the contact page.</p>

              {inquiries.length === 0 ? (
                <p className="no-inquiries">No contact messages received yet.</p>
              ) : (
                <div className="inquiries-list">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="inquiry-item-box">
                      <div className="inq-header">
                        <strong>{inq.name}</strong>
                        <span className="inq-date">{new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="inq-contact">
                        <span>📞 {inq.phone}</span>
                        {inq.email && <span>✉️ {inq.email}</span>}
                      </div>
                      <p className="inq-message">"{inq.message}"</p>
                      <a 
                        href={`https://wa.me/91${inq.phone}?text=Hi%20${encodeURIComponent(inq.name)},%20this%20is%20Dream%20Events%20regarding%20your%20inquiry.`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                      >
                        <MessageSquare size={14} />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DETAIL VIEW MODAL */}
      {selectedBookingModal && (
        <div className="modal-overlay" onClick={() => setSelectedBookingModal(null)}>
          <div className="booking-modal-box glass-panel modal-content-animated" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={() => setSelectedBookingModal(null)}
            >
              <X size={18} />
            </button>

            <span className="badge-pill badge-gold">{selectedBookingModal.status} Status</span>
            <h2 className="modal-ref-title text-gold-gradient">{selectedBookingModal.id}</h2>

            <div className="modal-details-grid">
              <div>
                <span className="modal-meta-label">Customer Name</span>
                <strong>{selectedBookingModal.customerName}</strong>
              </div>
              <div>
                <span className="modal-meta-label">Phone</span>
                <strong>{selectedBookingModal.phone}</strong>
              </div>
              <div>
                <span className="modal-meta-label">Event Type</span>
                <strong>{selectedBookingModal.eventType}</strong>
              </div>
              <div>
                <span className="modal-meta-label">Date & Timing</span>
                <strong>{selectedBookingModal.eventDate} ({selectedBookingModal.timing || 'Evening'})</strong>
              </div>
              <div>
                <span className="modal-meta-label">Venue</span>
                <strong>{selectedBookingModal.eventLocation}</strong>
              </div>
              <div>
                <span className="modal-meta-label">Guests</span>
                <strong>{selectedBookingModal.guestCount} Guests</strong>
              </div>
            </div>

            <div className="modal-stalls-section">
              <span className="modal-meta-label">Selected Live Counters:</span>
              <div className="modal-stalls-chips">
                {Array.isArray(selectedBookingModal.services) && selectedBookingModal.services.map((s, idx) => (
                  <span key={idx} className="chip">✦ {s}</span>
                ))}
              </div>
            </div>

            {selectedBookingModal.notes && (
              <div className="modal-notes">
                <span className="modal-meta-label">Client Notes:</span>
                <p>{selectedBookingModal.notes}</p>
              </div>
            )}

            <div className="modal-actions-bar">
              <a 
                href={`https://wa.me/91${selectedBookingModal.phone}?text=Hi%20${encodeURIComponent(selectedBookingModal.customerName)},%20this%20is%20Dream%20Events.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={16} />
                <span>Open WhatsApp</span>
              </a>

              <button 
                type="button" 
                className="btn btn-glass"
                onClick={() => setSelectedBookingModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-dashboard-page {
          background: #090314;
          min-height: 90vh;
        }

        .admin-header-strip {
          background: rgba(18, 7, 40, 0.95);
          border-bottom: 1px solid rgba(255, 215, 0, 0.25);
          padding: 1.25rem 0;
        }

        .admin-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .admin-header-title {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .admin-shield-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 215, 0, 0.15);
          border: 1px solid #FFD700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-title {
          font-size: 1.35rem;
          font-weight: 800;
          line-height: 1.15;
        }

        .admin-sub {
          font-size: 0.8rem;
          color: #A697C7;
        }

        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Metrics */
        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-box {
          padding: 1.5rem;
          border-radius: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-label {
          font-size: 0.78rem;
          color: #A697C7;
          text-transform: uppercase;
          font-weight: 700;
          display: block;
          margin-bottom: 0.35rem;
        }

        .metric-val {
          font-size: 1.85rem;
          font-weight: 900;
          font-family: var(--font-heading);
          line-height: 1;
        }

        .metric-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-gold {
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
        }

        .icon-pink {
          background: rgba(255, 46, 147, 0.15);
          color: #FF2E93;
        }

        .icon-green {
          background: rgba(0, 230, 118, 0.15);
          color: #00E676;
        }

        .icon-cyan {
          background: rgba(0, 229, 255, 0.15);
          color: #00E5FF;
        }

        /* Tabs Nav */
        .admin-tabs-nav {
          display: flex;
          gap: 0.65rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .admin-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #CBBEE2;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .admin-tab-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 215, 0, 0.3);
        }

        .admin-tab-btn.active {
          background: var(--gold-gradient);
          color: #120427;
          border-color: #FFD700;
          font-weight: 700;
        }

        /* Filter bar */
        .admin-filter-bar {
          padding: 1.25rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .admin-search-wrap {
          position: relative;
          flex: 1;
          min-width: 250px;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: #A697C7;
        }

        .admin-search-input {
          width: 100%;
          padding: 0.65rem 1rem 0.65rem 2.6rem;
          background: rgba(10, 3, 22, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          color: #ffffff;
          font-size: 0.88rem;
          outline: none;
        }

        .status-filter-pills {
          display: flex;
          gap: 0.35rem;
        }

        .status-btn {
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: #A697C7;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .status-btn.active {
          background: rgba(255, 215, 0, 0.15);
          border-color: #FFD700;
          color: #FFD700;
          font-weight: 700;
        }

        .export-btn-group {
          display: flex;
          gap: 0.5rem;
        }

        /* Bookings stack */
        .bookings-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-booking-row {
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .row-col-primary {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .booking-ref-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .row-ref-code {
          font-size: 1.25rem;
          font-weight: 900;
          font-family: var(--font-heading);
        }

        .row-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #FFE082;
          background: rgba(255, 215, 0, 0.08);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
        }

        .row-amount-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.84rem;
          font-weight: 750;
          color: #120427;
          background: linear-gradient(135deg, #FFE57F 0%, #FFD700 45%, #FFA000 100%);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        }

        .admin-rate-editor-box {
          margin: 0.75rem 0;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.65rem 0.85rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 215, 0, 0.2);
        }

        .rate-editor-label {
          display: block;
          font-size: 0.75rem;
          color: #FFE082;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .rate-input-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rate-currency {
          font-weight: 800;
          color: #FFD700;
        }

        .rate-number-input {
          width: 90px;
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          background: rgba(10, 3, 22, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .row-client-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
        }

        .row-meta-sub {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #A697C7;
          flex-wrap: wrap;
        }

        .row-stalls-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin: 0.25rem 0;
        }

        .small-stall-tag {
          font-size: 0.75rem;
          padding: 0.2rem 0.6rem;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          color: #E2D9F3;
        }

        .row-host-notes {
          font-size: 0.82rem;
          color: #CBBEE2;
          background: rgba(255, 255, 255, 0.03);
          padding: 0.5rem 0.8rem;
          border-radius: 8px;
        }

        .row-admin-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #69F0AE;
          background: rgba(0, 230, 118, 0.08);
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          border: 1px solid rgba(0, 230, 118, 0.2);
        }

        .edit-note-btn {
          background: transparent;
          border: none;
          color: #A697C7;
          cursor: pointer;
        }

        .add-note-btn {
          align-self: flex-start;
          background: transparent;
          border: none;
          color: #FFD700;
          font-size: 0.78rem;
          cursor: pointer;
          font-weight: 600;
        }

        .inline-note-editor {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-top: 0.35rem;
        }

        .inline-note-editor input {
          flex: 1;
          padding: 0.4rem 0.75rem;
          background: rgba(10, 3, 22, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #ffffff;
          font-size: 0.82rem;
        }

        .row-col-actions {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1rem;
        }

        .status-selector-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          align-items: flex-end;
        }

        .status-selector-wrap label {
          font-size: 0.72rem;
          color: #A697C7;
          text-transform: uppercase;
        }

        .admin-status-dropdown {
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: #14072b;
          color: #ffffff;
          cursor: pointer;
        }

        .status-select-pending {
          color: #FFD700;
          border-color: #FFD700;
        }

        .status-select-confirmed {
          color: #00E676;
          border-color: #00E676;
        }

        .status-select-staff-assigned {
          color: #00E5FF;
          border-color: #00E5FF;
        }

        .status-select-completed {
          color: #D8B4FE;
          border-color: #9D4EDD;
        }

        .row-quick-buttons {
          display: flex;
          gap: 0.5rem;
        }

        /* New booking form */
        .new-booking-form-card,
        .announcement-config-card,
        .inquiries-panel {
          padding: 2.5rem;
          border-radius: 20px;
          max-width: 820px;
          margin: 0 auto;
        }

        .card-top {
          margin-bottom: 2rem;
        }

        .card-top h3 {
          font-size: 1.4rem;
          font-weight: 800;
        }

        .card-top p {
          color: #A697C7;
          font-size: 0.9rem;
        }

        .booking-created-notice {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(0, 230, 118, 0.15);
          border: 1px solid rgba(0, 230, 118, 0.35);
          color: #69F0AE;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .offline-form,
        .announcement-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.85rem;
          color: #E2D9F3;
          font-weight: 700;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.85rem;
          background: rgba(10, 3, 22, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
        }

        .checkboxes-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .offline-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          color: #ffffff;
          cursor: pointer;
        }

        .offline-checkbox-label input[type="checkbox"] {
          accent-color: #FFD700;
        }

        /* Announcement toggle */
        .toggle-switch-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          color: #ffffff;
          cursor: pointer;
        }

        .toggle-switch-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          accent-color: #FFD700;
        }

        /* Services grid */
        .services-admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .service-admin-card {
          border-radius: 18px;
          overflow: hidden;
          padding: 1.25rem;
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .service-admin-thumb {
          width: 70px;
          height: 70px;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .service-admin-info h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .admin-rate {
          font-size: 0.82rem;
          color: #E2D9F3;
          margin: 0.2rem 0;
        }

        .admin-cap {
          font-size: 0.75rem;
          color: #A697C7;
        }

        .service-status-tag {
          font-size: 0.72rem;
          color: #00E676;
          margin-top: 0.35rem;
          font-weight: 600;
        }

        /* Inquiries */
        .inquiries-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .inquiry-item-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .inq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .inq-date {
          font-size: 0.75rem;
          color: #A697C7;
        }

        .inq-contact {
          display: flex;
          gap: 1.25rem;
          font-size: 0.82rem;
          color: #FFE082;
        }

        .inq-message {
          font-size: 0.92rem;
          color: #E2D9F3;
          font-style: italic;
          margin-top: 0.25rem;
        }

        /* Modal */
        .booking-modal-box {
          max-width: 600px;
          width: 100%;
          padding: 2.5rem;
          border-radius: 24px;
          position: relative;
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #ffffff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-ref-title {
          font-size: 2rem;
          font-weight: 900;
          font-family: var(--font-heading);
          margin: 0.5rem 0 1.5rem;
        }

        .modal-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 1.25rem;
          border-radius: 14px;
          margin-bottom: 1.5rem;
        }

        .modal-meta-label {
          display: block;
          font-size: 0.72rem;
          text-transform: uppercase;
          color: #A697C7;
        }

        .modal-stalls-chips {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }

        .modal-stalls-chips .chip {
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 215, 0, 0.12);
          border: 1px solid rgba(255, 215, 0, 0.3);
          color: #FFD700;
          font-size: 0.8rem;
        }

        .modal-notes {
          margin-top: 1.25rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }

        .modal-notes p {
          font-size: 0.9rem;
          color: #E2D9F3;
          margin-top: 0.25rem;
        }

        .modal-actions-bar {
          display: flex;
          gap: 1rem;
          margin-top: 1.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1.25rem;
        }

        @media (max-width: 992px) {
          .admin-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-booking-row {
            flex-direction: column;
          }
          .row-col-actions {
            align-items: flex-start;
          }
          .form-grid-2, .form-grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
