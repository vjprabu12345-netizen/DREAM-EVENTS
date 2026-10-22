// Dream Events Official Business Details
export const BUSINESS_INFO = {
  name: "Dream Events",
  tagline: "Make Every Moment Special",
  subtitle: "Creating unforgettable celebrations with delicious treats, refreshing drinks, and delightful experiences.",
  phones: [
    { number: "9488819134", display: "+91 94888 19134", isPrimary: true, label: "Primary Booking & WhatsApp" },
    { number: "9123590148", display: "+91 91235 90148", isPrimary: false, label: "Support & Enquiries" },
    { number: "9384363221", display: "+91 93843 63221", isPrimary: false, label: "Event Coordinator" }
  ],
  primaryPhone: "9488819134",
  whatsappNumber: "919488819134",
  address: {
    street: "Thiruvalluvar Nagar, Virattikuppam Road",
    city: "Villupuram",
    pincode: "605602",
    state: "Tamil Nadu",
    country: "India",
    full: "Thiruvalluvar Nagar, Virattikuppam Road, Villupuram 605602, Tamil Nadu, India."
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31215.11585257549!2d79.47953259999999!3d11.9401258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53569c768995ab%3A0xe51aa989fbbfbe78!2sVillupuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  eventTypes: [
    "Wedding & Reception",
    "Birthday Celebration",
    "Engagement Ceremony",
    "Baby Shower / Seemantham",
    "Anniversary Party",
    "House Warming (Gruhapravesam)",
    "Corporate & Annual Meet",
    "School / College Carnival",
    "Other Special Celebration"
  ]
};

/**
 * Helper to generate pre-filled WhatsApp click-to-chat links
 */
export const createWhatsAppBookingLink = (bookingDetails) => {
  const {
    name = "",
    phone = "",
    eventType = "",
    date = "",
    location = "",
    guests = "",
    services = [],
    notes = "",
    estimatedTotal = ""
  } = bookingDetails;

  const servicesList = services.length > 0 ? services.join(", ") : "All Signature Services";

  const message = `🎉 *DREAM EVENTS CATERING BOOKING ENQUIRY* 🎉
--------------------------------------
👤 *Customer Name:* ${name}
📞 *Phone Number:* ${phone}
🎊 *Event Type:* ${eventType || "Celebration"}
📅 *Event Date:* ${date || "To be decided"}
📍 *Event Location:* ${location || "Villupuram / Nearby"}
👥 *Estimated Guests:* ${guests || "Not specified"}
🍰 *Selected Services:* ${servicesList}
💰 *Estimated Budget:* ${estimatedTotal || "Custom Package Quote"}
📝 *Additional Requirements:* ${notes ? notes : "Please share package rates & availability."}
--------------------------------------
Sent from Dream Events Website`;

  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
