// Dream Events Client-side / Local Storage State Engine
import { INITIAL_SAMPLE_BOOKINGS, INITIAL_ANNOUNCEMENT } from '../data/siteData';

const BOOKINGS_KEY = 'dream_events_bookings_v1';
const INQUIRIES_KEY = 'dream_events_inquiries_v1';
const ANNOUNCEMENT_KEY = 'dream_events_announcement_v1';

export function getStoredBookings() {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_BOOKINGS;
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_SAMPLE_BOOKINGS));
      return INITIAL_SAMPLE_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading bookings:', err);
    return INITIAL_SAMPLE_BOOKINGS;
  }
}

export function saveBooking(booking) {
  if (typeof window === 'undefined') return booking;
  try {
    const current = getStoredBookings();
    const updated = [booking, ...current];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return booking;
  } catch (err) {
    console.error('Error saving booking:', err);
    return booking;
  }
}

export function updateBookingStatus(id, newStatus, adminNote = '') {
  if (typeof window === 'undefined') return false;
  try {
    const current = getStoredBookings();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          adminNote: adminNote || item.adminNote || '',
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error updating booking status:', err);
    return false;
  }
}

export function deleteBooking(id) {
  if (typeof window === 'undefined') return false;
  try {
    const current = getStoredBookings();
    const filtered = current.filter(item => item.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error deleting booking:', err);
    return false;
  }
}

export function resetSampleBookings() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_SAMPLE_BOOKINGS));
}

// Contact Inquiries
export function getStoredInquiries() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function saveInquiry(inquiry) {
  if (typeof window === 'undefined') return inquiry;
  try {
    const current = getStoredInquiries();
    const itemWithId = {
      ...inquiry,
      id: `INQ-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify([itemWithId, ...current]));
    return itemWithId;
  } catch (err) {
    return inquiry;
  }
}

// Announcements
export function getStoredAnnouncement() {
  if (typeof window === 'undefined') return INITIAL_ANNOUNCEMENT;
  try {
    const raw = localStorage.getItem(ANNOUNCEMENT_KEY);
    return raw ? JSON.parse(raw) : INITIAL_ANNOUNCEMENT;
  } catch (err) {
    return INITIAL_ANNOUNCEMENT;
  }
}

export function saveAnnouncement(announcement) {
  if (typeof window === 'undefined') return announcement;
  try {
    localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(announcement));
    return announcement;
  } catch (err) {
    return announcement;
  }
}

// Live Stall Prices Engine
const PRICES_KEY = 'dream_events_custom_prices_v1';

export function getStoredServicePrices() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PRICES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

export function saveServicePrice(serviceId, newPrice) {
  if (typeof window === 'undefined') return false;
  try {
    const current = getStoredServicePrices();
    current[serviceId] = Number(newPrice);
    localStorage.setItem(PRICES_KEY, JSON.stringify(current));
    return true;
  } catch (err) {
    console.error('Error saving price:', err);
    return false;
  }
}

export function resetServicePrices() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PRICES_KEY);
}

