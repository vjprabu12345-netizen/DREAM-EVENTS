# Dream Events - Production Next.js Event Catering Application

A luxury, production-grade web application built with **Next.js (App Router)** for **Dream Events**, Villupuram's premier celebration catering and live food counter specialists.

## 🚀 Key Features

- **Multi-Page Routing**: Separate, dedicated pages for each section with SEO optimization.
- **Dedicated Admin Portal (`/admin`)**:
  - Protected with passcode: `admin123`
  - Live revenue and inquiry metrics
  - Real-time status updater (Pending → Confirmed → Staff Assigned → Completed)
  - Inline coordinator notes & staff assignment
  - Quick offline booking creator
  - Site-wide announcement bar editor
  - Export bookings to CSV spreadsheet & JSON backup
- **Dynamic Services Catalog (`/services` & `/services/[slug]`)**:
  - Dedicated pages for all 7 stalls: Fruit Salad, Chocolate Fountain, Sweet Beeda, Welcome Drinks, Ice Cream, Cotton Candy, Popcorn
  - Inclusions, capacity specifications, FAQs, and direct booking
- **Interactive Celebration Package & Cost Estimator (`/calculator`)**:
  - Live guest count slider (50 to 2,000+ guests)
  - Automatic combo bundle discounts (5%, 10%, 15% OFF)
  - Presentation add-ons (Dry-ice fog mist, Golden lighting, Butler stewards)
  - Instant blueprint quotation & 1-click WhatsApp export
- **Live Booking Tracker (`/track`)**:
  - Search by Booking ID (e.g. `DE-2026-7841`) or phone number
  - Visual 4-step progress bar (Inquiry Received → Date Confirmed → Crew Assigned → Celebrated)
- **Visual Celebration Gallery (`/gallery`)**:
  - Filter by Weddings, Birthdays, Receptions, Carnivals
  - High-res interactive lightbox modal
- **Multi-Step VIP Booking Engine (`/book`)**:
  - 3-step interactive booking flow
  - Pre-filled URL parameter support from stalls catalog and cost estimator
  - Confetti celebration animation & WhatsApp confirmation link generator
- **Official Contact & Location (`/contact`)**:
  - 3 direct phone lines with click-to-dial
  - Interactive Google Maps embed for Villupuram office
  - Direct inquiry submission system

## 📂 Site Structure

| Route | Purpose |
|---|---|
| `/` | Homepage with hero, stats, live counter showcase, and reviews |
| `/services` | Comprehensive searchable & filterable stalls catalog |
| `/services/[slug]` | Individual service detail page with specifications & FAQs |
| `/calculator` | Interactive Celebration Cost Estimator & Package Blueprint |
| `/gallery` | Photo portfolio with category filters and lightbox view |
| `/about` | Our story, hygiene commitments, coverage areas |
| `/book` | Multi-step VIP booking inquiry form |
| `/track` | Real-time client booking tracking portal |
| `/contact` | Office location, 3 phone lines, Google Maps & message form |
| `/admin` | Administrative dashboard (Passcode: `admin123`) |
| `/api/bookings` | Next.js REST API route for bookings |
| `/api/inquiries` | Next.js REST API route for contact messages |

## 🛠️ Development & Production

```bash
# Run local development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```
