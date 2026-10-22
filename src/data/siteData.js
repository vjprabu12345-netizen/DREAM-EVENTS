// Site-wide data for Dream Events production app

export const STATS_DATA = [
  { value: "1,250+", label: "Events Catered", description: "Across Tamil Nadu & Pondicherry" },
  { value: "7", label: "Signature Stalls", description: "Interactive live celebration stations" },
  { value: "99.8%", label: "Client Satisfaction", description: "Over 500+ verified 5-star reviews" },
  { value: "100%", label: "Hygiene Certified", description: "Food grade & sanitized gear" }
];

export const TESTIMONIALS_DATA = [
  {
    id: "rev-1",
    name: "Dr. K. Vignesh & Swetha",
    event: "Grand Wedding Reception",
    location: "Kalyana Mandapam, Villupuram",
    date: "February 2026",
    rating: 5,
    text: "The Chocolate Fountain and Welcome Drinks were the absolute highlight of our reception! Our 1,200 guests couldn't stop praising the presentation and taste. Uniformed staff was courteous, polite, and handled the crowd effortlessly. Highly recommend Dream Events!",
    avatar: "VS",
    featured: true
  },
  {
    id: "rev-2",
    name: "S. Rajesh Kumar",
    event: "Daughter's 5th Birthday Party",
    location: "Green Meadows Club, Pondicherry",
    date: "January 2026",
    rating: 5,
    text: "The kids went crazy over the live Cotton Candy spinning and Popcorn cart! The nostalgic pink clouds and cinema aroma added pure carnival magic. Best event catering team in this region by far.",
    avatar: "RK",
    featured: true
  },
  {
    id: "rev-3",
    name: "Anand & Meenakshi",
    event: "Traditional Seemantham & Feasting",
    location: "Sri Ram Mahal, Tindivanam",
    date: "November 2025",
    rating: 5,
    text: "The Sweet Beeda stall was an authentic royal experience. Silver vark wrapping and genuine rose gulkand without any supari. Even our grandparents were touched by the hospitality and taste.",
    avatar: "AM",
    featured: true
  },
  {
    id: "rev-4",
    name: "Pravin Chandran",
    event: "Corporate Annual Gala (IT Meet)",
    location: "Ocean Spray Resort, ECR",
    date: "December 2025",
    rating: 5,
    text: "Flawless setup of Fruit Salad and Dry Ice Mocktails. Arrived 2 hours early, setup looked spectacular with ambient lighting, and zero mess. Very professional team.",
    avatar: "PC",
    featured: false
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Luxury 4-Tier Chocolate Fountain",
    category: "Weddings",
    image: "/images/chocolate-fountain.jpg",
    location: "Villupuram Grand Palace",
    guests: "800 Guests",
    description: "Flowing Belgian chocolate with farm strawberries and marshmallow skewers."
  },
  {
    id: "gal-2",
    title: "Theatrical Welcome Mocktail Counter",
    category: "Receptions",
    image: "/images/welcome-drinks.jpg",
    location: "Pondicherry Convention Centre",
    guests: "1,200 Guests",
    description: "Dry ice fog mist with Blue Lagoon and Virgin Mojito in crystal glasses."
  },
  {
    id: "gal-3",
    title: "Artistic Carved Fruit Salad Display",
    category: "Weddings",
    image: "/images/fruit-salad.jpg",
    location: "Sri Krishna Mahal, Villupuram",
    guests: "600 Guests",
    description: "Watermelon peacock carving with exotic dragon fruit, kiwi, and honey nuts."
  },
  {
    id: "gal-4",
    title: "Royal Meetha Paan Stall",
    category: "Traditional",
    image: "/images/sweet-beeda.jpg",
    location: "Thirukoilur Wedding Hall",
    guests: "900 Guests",
    description: "Artisan Sweet Beeda with silver leaf foil, gulkand, and glazed cherries."
  },
  {
    id: "gal-5",
    title: "Gourmet Ice Cream & Sundae Parlor",
    category: "Birthdays",
    image: "/images/ice-cream.jpg",
    location: "Golden Park Banquet, Cuddalore",
    guests: "400 Guests",
    description: "Assorted waffle cones with unlimited chocolate sprinkles & nuts toppings bar."
  },
  {
    id: "gal-6",
    title: "Vintage Fairy Floss Cotton Candy Cart",
    category: "Carnivals",
    image: "/images/cotton-candy.jpg",
    location: "St. Joseph School Festival, Villupuram",
    guests: "1,500 Kids",
    description: "Airy pink strawberry and blue raspberry clouds spun live on sticks."
  },
  {
    id: "gal-7",
    title: "Hot Buttered Cinema Popcorn Cart",
    category: "Carnivals",
    image: "/images/popcorn.jpg",
    location: "Sunway Manor, Pondicherry",
    guests: "500 Guests",
    description: "Illuminated vintage cart popping fresh kernels with golden butter seasoning."
  },
  {
    id: "gal-8",
    title: "Grand Celebration Buffet Setup",
    category: "Weddings",
    image: "/images/hero-banner.jpg",
    location: "Villupuram Central Banquet",
    guests: "2,000 Guests",
    description: "Complete 7-stall live counter celebration extravaganza."
  }
];

export const GALLERY_CATEGORIES = ["All", "Weddings", "Receptions", "Birthdays", "Carnivals", "Traditional"];

export const INITIAL_SAMPLE_BOOKINGS = [
  {
    id: "DE-2026-7841",
    customerName: "Senthil Nathan",
    phone: "9842103948",
    email: "senthil.n@gmail.com",
    eventType: "Wedding & Reception",
    eventDate: "2026-11-15",
    eventLocation: "Villupuram City Hall",
    guestCount: 650,
    services: ["Fruit Salad", "Chocolate Fountain", "Sweet Beeda", "Welcome Drinks"],
    notes: "Need early setup before 4:00 PM for evening reception. Special focus on dry ice mocktails.",
    estimatedTotal: "₹45,500",
    status: "Confirmed",
    createdAt: "2026-10-15T10:30:00Z"
  },
  {
    id: "DE-2026-7842",
    customerName: "Priya Sundaram",
    phone: "9443210985",
    email: "priya.sundar@yahoo.com",
    eventType: "Birthday Celebration",
    eventDate: "2026-10-28",
    eventLocation: "Pondicherry Beach Road Lawn",
    guestCount: 150,
    services: ["Cotton Candy", "Popcorn", "Ice Cream", "Chocolate Fountain"],
    notes: "Daughter's 7th birthday celebration. Children theme with pastel colors.",
    estimatedTotal: "₹21,750",
    status: "Pending",
    createdAt: "2026-10-16T14:15:00Z"
  },
  {
    id: "DE-2026-7843",
    customerName: "Karthik Raja",
    phone: "9789012345",
    email: "karthik.raja88@outlook.com",
    eventType: "House Warming (Gruhapravesam)",
    eventDate: "2026-11-02",
    eventLocation: "Thiruvalluvar Nagar, Villupuram",
    guestCount: 300,
    services: ["Sweet Beeda", "Welcome Drinks", "Ice Cream"],
    notes: "Traditional morning ceremony starting around 9:00 AM.",
    estimatedTotal: "₹28,500",
    status: "Staff Assigned",
    createdAt: "2026-10-14T09:00:00Z"
  },
  {
    id: "DE-2026-7844",
    customerName: "M. Abdul Rahman",
    phone: "9894123890",
    email: "abdul.rahman@gmail.com",
    eventType: "Engagement Ceremony",
    eventDate: "2026-10-10",
    eventLocation: "Cuddalore Sea View Hall",
    guestCount: 450,
    services: ["Fruit Salad", "Chocolate Fountain", "Welcome Drinks"],
    notes: "Event completed with high praise from all family members.",
    estimatedTotal: "₹38,250",
    status: "Completed",
    createdAt: "2026-10-02T16:20:00Z"
  }
];

export const INITIAL_ANNOUNCEMENT = {
  enabled: true,
  badge: "Festive Offer",
  text: "Special 10% Discount on All 7-Stall Combined Wedding Packages for Upcoming Season!",
  linkText: "Check Estimator",
  linkUrl: "/calculator"
};
