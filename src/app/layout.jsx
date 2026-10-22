import './globals.css';
import AnnouncementBar from '../components/AnnouncementBar';
import NextNavbar from '../components/NextNavbar';
import NextFooter from '../components/NextFooter';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export const metadata = {
  metadataBase: new URL('https://dreamevents.in'),
  title: 'Dream Events | Premium Event Catering & Celebration Live Counters',
  description: 'Dream Events in Villupuram provides luxury live catering counters for weddings, birthdays & celebrations across Tamil Nadu and Pondicherry. Fruit salad, chocolate fountain, sweet beeda, mocktails, ice cream, cotton candy & popcorn.',
  keywords: 'Dream Events, Villupuram catering, chocolate fountain, sweet beeda, fruit salad counter, welcome drinks, ice cream stall, cotton candy, popcorn machine, wedding live counters Tamil Nadu, event catering Pondicherry',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Dream Events | Make Every Moment Special',
    description: 'Creating unforgettable celebrations with delicious treats, refreshing drinks, and delightful live counter experiences in Villupuram and beyond.',
    url: 'https://dreamevents.in',
    siteName: 'Dream Events',
    images: [
      {
        url: '/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Dream Events Celebration Setup'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <AnnouncementBar />
        <NextNavbar />
        <div style={{ flex: 1, minHeight: '80vh' }}>
          {children}
        </div>
        <NextFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
