// src/data/gymData.js
// SINGLE SOURCE OF TRUTH — every component imports from here.
// Never hardcode gym info anywhere else.

export const GYM_DATA = {
  name: "PowerFit Gym",
  tagline: "Transform Your Body. Elevate Your Life.",
  location: {
    address: "Plot 45, MIDC Road, Chinchwad, Pune - 411019",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Plot+45+MIDC+Road+Chinchwad+Pune&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://www.google.com/maps/search/Plot+45+MIDC+Road+Chinchwad+Pune",
  },
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "info@powerfitgym.in",
    instagram: "#",
    youtube: "#",
    facebook: "#",
  },
  timings: {
    weekdays: { open: "5:30 AM", close: "10:00 PM" },
    saturday: { open: "6:00 AM", close: "8:00 PM" },
    sunday: { open: "7:00 AM", close: "1:00 PM" },
  },
  classes: [
    "Strength Training",
    "CrossFit",
    "Yoga",
    "Zumba",
    "HIIT",
    "Cardio",
  ],
  batches: [
    {
      id: 1,
      time: "5:30 AM – 7:00 AM",
      type: "Cardio + Strength",
      trainer: "Rohan Patil",
      slots: 12,
      booked: 8,
      days: "Mon–Sat",
    },
    {
      id: 2,
      time: "7:00 AM – 9:00 AM",
      type: "General Fitness",
      trainer: "Akash Shinde",
      slots: 15,
      booked: 11,
      days: "Mon–Sat",
    },
    {
      id: 3,
      time: "9:00 AM – 10:30 AM",
      type: "Yoga & Flexibility",
      trainer: "Sneha More",
      slots: 10,
      booked: 4,
      days: "Mon–Sat",
    },
    {
      id: 4,
      time: "6:00 PM – 7:30 PM",
      type: "CrossFit & HIIT",
      trainer: "Akash Shinde",
      slots: 12,
      booked: 12,
      days: "Mon–Fri",
    },
    {
      id: 5,
      time: "7:30 PM – 9:00 PM",
      type: "Zumba & Cardio",
      trainer: "Priya Desai",
      slots: 15,
      booked: 7,
      days: "Mon–Sat",
    },
    {
      id: 6,
      time: "9:00 PM – 10:00 PM",
      type: "Strength Training",
      trainer: "Rohan Patil",
      slots: 10,
      booked: 5,
      days: "Mon–Fri",
    },
  ],
  membership: {
    monthly: {
      price: 999,
      period: "month",
      features: [
        "Unlimited gym access",
        "Locker facility",
        "1 group class/day",
        "Fitness assessment",
      ],
    },
    quarterly: {
      price: 2499,
      period: "3 months",
      popular: true,
      features: [
        "Everything in Monthly",
        "1 Personal training session",
        "Diet consultation",
        "Guest pass (1/month)",
      ],
    },
    annual: {
      price: 7999,
      period: "year",
      features: [
        "Everything in Quarterly",
        "4 Personal training sessions",
        "Full diet plan",
        "Body composition analysis",
        "Priority batch booking",
      ],
    },
  },
  trainers: [
    {
      id: 1,
      name: "Rohan Patil",
      speciality: "Strength & Conditioning",
      experience: "8 years",
      cert: "NSCA-CSCS",
      bio: "Former national-level powerlifter. Specialises in progressive overload and body recomposition.",
    },
    {
      id: 2,
      name: "Priya Desai",
      speciality: "Zumba & Cardio",
      experience: "6 years",
      cert: "ACE Certified",
      bio: "Energy-packed Zumba instructor. Makes every session feel like a dance party.",
    },
    {
      id: 3,
      name: "Akash Shinde",
      speciality: "CrossFit & HIIT",
      experience: "7 years",
      cert: "CF-L2 Trainer",
      bio: "CrossFit Level 2 coach. Builds functional strength and mental toughness.",
    },
    {
      id: 4,
      name: "Sneha More",
      speciality: "Yoga & Flexibility",
      experience: "9 years",
      cert: "RYT-500",
      bio: "500-hour certified yoga teacher. Combines traditional yoga with modern mobility work.",
    },
  ],
  freeTrial: {
    offer: "First session completely free",
    how: "Just walk in or WhatsApp us to book your slot",
    whatsappText: "Hi, I want to book a free trial session at PowerFit Gym",
  },
  faqs: [
    {
      q: "What are your timings?",
      a: "Weekdays 5:30 AM–10:00 PM, Saturday 6:00 AM–8:00 PM, Sunday 7:00 AM–1:00 PM",
    },
    {
      q: "How much is monthly membership?",
      a: "₹999/month. Quarterly is ₹2,499 and Annual is ₹7,999 with more benefits.",
    },
    {
      q: "Do you offer a free trial?",
      a: "Yes! Your first session is completely free. Walk in or WhatsApp us to book.",
    },
    {
      q: "Which batch has availability?",
      a: "Morning 9 AM yoga and evening 7:30 PM Zumba batches have slots. Others are mostly full.",
    },
    {
      q: "Do you have personal trainers?",
      a: "Yes, all 4 of our trainers offer 1-on-1 sessions. Quarterly and Annual plans include PT sessions.",
    },
    {
      q: "Is there a locker facility?",
      a: "Yes, all membership plans include locker access.",
    },
  ],
};
