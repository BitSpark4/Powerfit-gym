# CLAUDE.md — PowerFit Gym Demo Website
# Agent: Read this ENTIRE file before writing a single line of code.

---

## 🎯 What We Are Building

**Project name:** PowerFit Gym — Chinchwad
**Type:** Demo website for client acquisition (not a real gym client yet)
**Purpose:** Vishal (founder) shows this to gym owners in Chinchwad/Pimpri/Baner area.
The demo must be so good that when a gym owner sees the AI chatbot answering
"what are your timings?" at 11pm — they pull out their wallet immediately.

**Live URL (after deploy):** Netlify free tier — TBD
**Repo:** Private GitHub repo

---

## 👤 Business Context (Why This Exists)

Vishal is a solo developer building a software company in Pune.
This demo website is Tier 1 of his client acquisition strategy.
Target clients: Gyms, yoga studios, CrossFit centres in Chinchwad / Pimpri / Baner.

**What makes this demo win clients:**
- Every gym owner knows their competitor has a website
- The AI chatbot answering gym queries at 11pm is the closer
- "Show, don't tell" — live demo beats any sales pitch

**Stack choice reason:** React + Vite + Tailwind + Netlify Functions — same as
Vishal's main product InterviewIQ, so zero learning curve, fast build.

---

## 🛠️ Tech Stack (Exact)

| Layer | Technology | Why |
|---|---|---|
| Frontend framework | React 18 + Vite | Fast dev server, HMR |
| Styling | Tailwind CSS v3 | Utility-first, responsive built-in |
| Icons | Lucide React | Consistent, lightweight |
| Serverless | Netlify Functions (Node.js) | Claude API proxy — hides API key |
| AI | Claude API — claude-haiku-4-5 | Fast, cheap, perfect for chatbot |
| Maps | Google Maps iframe embed | No API key needed for embed |
| WhatsApp | wa.me link | Direct enquiry CTA |
| Hosting | Netlify (free tier) | Auto-deploy from GitHub |
| Package manager | npm | Standard |

**NOT used in this project:**
- No Supabase (static site, no database needed)
- No authentication (public demo site)
- No React Router (single page, scroll-based)
- No Redux / Zustand (no complex state)
- No TypeScript (keep it fast to build)
- No payment gateway (demo only)

---

## 📁 Exact File Structure

```
powerfit-gym/
├── public/
│   ├── hero-bg.jpg          # Dark gym photo (download free from Unsplash)
│   ├── trainer-1.jpg        # Trainer photos (use placeholder if needed)
│   ├── trainer-2.jpg
│   ├── trainer-3.jpg
│   ├── trainer-4.jpg
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky top nav with smooth scroll links
│   │   ├── Hero.jsx             # Full-height hero, tagline, CTA button, class list
│   │   ├── ClassSchedule.jsx    # Weekly timetable grid (Mon–Sun × batch slots)
│   │   ├── MembershipPlans.jsx  # 3 pricing cards: monthly / quarterly / annual
│   │   ├── Trainers.jsx         # 4 trainer profile cards with photo + specialisation
│   │   ├── Location.jsx         # Google Maps iframe + address + phone + hours
│   │   ├── Footer.jsx           # Links, copyright, social icons
│   │   ├── ChatBot.jsx          # ★ THE DEMO KILLER — floating AI chat widget
│   │   └── WhatsAppButton.jsx   # Fixed bottom-right floating WhatsApp button
│   │
│   ├── data/
│   │   └── gymData.js           # ★ SINGLE SOURCE OF TRUTH — ALL gym content here
│   │
│   ├── App.jsx                  # Renders all sections in order
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind directives + custom scrollbar + fonts
│
├── netlify/
│   └── functions/
│       └── chat-proxy.js        # ★ Claude API proxy — API key NEVER goes to frontend
│
├── .env                         # CLAUDE_API_KEY=sk-ant-... (never commit this)
├── .env.example                 # CLAUDE_API_KEY=your_key_here (commit this)
├── .gitignore                   # node_modules, .env, dist
├── netlify.toml                 # Build command + functions dir + redirect rules
├── vite.config.js               # Standard Vite config
├── tailwind.config.js           # Custom colors + font config
├── package.json
└── STATUS.md                    # Dev progress tracker
```

---

## 🎨 Design System

### Color Palette
```
Background (page):     #0B0F19   (very dark navy)
Card background:       #111827   (dark gray-blue)
Card border:           #1F2937   (subtle border)
Primary brand:         #22C55E   (green — all CTAs, highlights)
Primary hover:         #16A34A   (darker green)
Text primary:          #F9FAFB   (near white)
Text secondary:        #9CA3AF   (muted gray)
Text accent:           #22C55E   (green for labels)
Pricing highlight:     #FBBF24   (amber — "Most Popular" badge)
```

### Typography
```
Font: Inter (Google Fonts) — import in index.css
Headings: font-bold, tracking-tight
Body: font-normal, leading-relaxed
Navbar: font-medium
```

### Component Design Rules
- Dark theme throughout — no white backgrounds
- Cards: bg-[#111827] with border border-[#1F2937] and rounded-2xl
- Buttons (primary): bg-[#22C55E] text-white hover:bg-[#16A34A] rounded-full px-8 py-3
- Section padding: py-20 (desktop) py-12 (mobile)
- Max content width: max-w-6xl mx-auto px-6
- Smooth scroll behaviour on html element
- All hover states: transition-all duration-300

---

## 📋 Section-by-Section Build Spec

### 1. Navbar
- Sticky top, transparent → solid bg on scroll (useEffect + scroll listener)
- Logo: "PowerFit" in green + "GYM" in white, bold
- Nav links: Home, Classes, Membership, Trainers, Location (smooth scroll to sections)
- CTA button: "Join Now" → scrolls to membership section
- Mobile: hamburger menu with slide-down drawer
- Z-index: 50 (above everything except chatbot)

### 2. Hero Section
- Full viewport height (min-h-screen)
- Background: hero-bg.jpg with dark overlay (bg-black/60)
- Headline: "Transform Your Body. Elevate Your Life." (white, large)
- Subheadline: "Chinchwad's Premier Fitness Centre — Results Guaranteed"
- CTA buttons: "Start Free Trial" (green) + "View Membership Plans" (outline white)
- Below buttons: icon pills showing offered classes (Strength | CrossFit | Yoga | Zumba | HIIT)
- Scroll indicator arrow at bottom

### 3. Class Schedule
- Section id="classes"
- Tab switcher: Weekdays | Saturday | Sunday (using gymData.js batches)
- Grid showing: Time | Class Type | Trainer | Available Slots
- Highlight full batches in red, available in green
- "Book a Trial Class" CTA at bottom → WhatsApp link

### 4. Membership Plans
- Section id="membership"
- 3 cards side by side (stack on mobile)
  - Monthly: ₹999/month
  - Quarterly: ₹2,499 (most popular — highlighted with amber badge + green border)
  - Annual: ₹7,999/year
- Each card: price, billing period, feature list with checkmarks, CTA button
- "Most Popular" card: slightly larger scale (scale-105) with glow effect
- Footnote: "All plans include locker access + free trial session"

### 5. Trainer Profiles
- Section id="trainers"
- 4 cards in 2×2 grid (stack to 1 column on mobile)
- Each card: photo (rounded-full), name, specialisation badge, short bio (2 lines)
- Hover: card lifts (hover:-translate-y-1 shadow-lg)
- Data from gymData.js trainers array

### 6. Location & Contact
- Section id="location"
- Left side: Google Maps iframe (Plot 45, MIDC Road, Chinchwad)
- Right side:
  - Full address with map pin icon
  - Phone with phone icon (click to call)
  - Weekday hours + Weekend hours
  - "Get Directions" button → Google Maps URL
  - WhatsApp enquiry button

### 7. Footer
- Dark bg (#0B0F19)
- Logo + tagline
- Quick links column
- Contact column
- Social icons (Instagram, YouTube, Facebook — href="#" for demo)
- Copyright: "© 2025 PowerFit Gym, Chinchwad. All rights reserved."

### 8. ChatBot Widget ★ MOST IMPORTANT
See dedicated AI Chatbot section below.

### 9. WhatsApp Floating Button
- Fixed position: bottom-6 right-6
- Z-index: 40 (below chatbot which is z-50)
- Green circle button with WhatsApp icon (Lucide)
- Tooltip on hover: "Chat with us on WhatsApp"
- Links to: https://wa.me/919876543210?text=Hi, I want to know about membership at PowerFit Gym
- Pulse animation ring (CSS animation) to draw attention

---

## 🤖 AI Chatbot — Full Specification

### What it does
Answers gym enquiries 24/7. Knows everything about PowerFit:
timings, pricing, batch availability, trainers, free trial, location.
Every reply ends with a WhatsApp CTA.

### UI Behaviour
- Floating button: bottom-24 right-6 (above WhatsApp button), z-50
- Closed state: green circular button with MessageCircle icon + pulsing dot
- Open state: chat window 380px wide × 500px tall, slide-up animation
- Header: "PowerFit AI Assistant" + green dot + "Online" text + close button
- Messages: user bubbles (right, green bg) + bot bubbles (left, dark card bg)
- Input: text field + send button
- Starter prompts: 3 quick-reply chips shown before first message
  - "What are your timings?" 
  - "How much is membership?"
  - "Do you have a free trial?"
- Typing indicator: 3 bouncing dots while waiting for response
- Auto-scroll to latest message

### Frontend: ChatBot.jsx
```javascript
// State needed:
// isOpen, messages[], inputText, isLoading

// On send:
// POST to /.netlify/functions/chat-proxy
// Body: { message: userText, history: previousMessages }
// Response: { reply: "..." }

// Message object shape:
// { id, role: 'user'|'assistant', content, timestamp }
```

### Backend: netlify/functions/chat-proxy.js
```javascript
// Pattern — IDENTICAL to InterviewIQ's claude-proxy.js
// 1. Read CLAUDE_API_KEY from process.env
// 2. Build system prompt from gymData (JSON.stringify the whole object)
// 3. Call Claude API: claude-haiku-4-5, max_tokens: 300
// 4. Return { reply: responseText }
// 5. Handle errors with proper HTTP status codes

// SYSTEM PROMPT injected server-side:
// "You are the AI assistant for PowerFit Gym, Chinchwad.
//  You answer questions about timings, membership fees, trainers,
//  classes, and free trials. Be friendly and concise.
//  Always end your reply with: 'Want to know more? WhatsApp us: +91 98765 43210'
//  Here is all the gym information: [JSON.stringify(GYM_DATA)]"
```

### Model choice
Use **claude-haiku-4-5** — fast (under 2 seconds), cheap per token.
No streaming — simpler code, easier error handling.
Max tokens: 300 (gym answers don't need to be long).

---

## 📊 gymData.js — Single Source of Truth

```javascript
// src/data/gymData.js
// EVERY component imports from here. Never hardcode gym info anywhere else.

export const GYM_DATA = {
  name: "PowerFit Gym",
  tagline: "Transform Your Body. Elevate Your Life.",
  location: {
    address: "Plot 45, MIDC Road, Chinchwad, Pune - 411019",
    mapEmbedUrl: "https://maps.google.com/maps?q=...",  // add real embed URL
    googleMapsUrl: "https://goo.gl/maps/..."
  },
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "info@powerfitgym.in",
    instagram: "#",
    youtube: "#"
  },
  timings: {
    weekdays: { open: "5:30 AM", close: "10:00 PM" },
    saturday: { open: "6:00 AM", close: "8:00 PM" },
    sunday:   { open: "7:00 AM", close: "1:00 PM" }
  },
  classes: ["Strength Training", "CrossFit", "Yoga", "Zumba", "HIIT", "Cardio"],
  batches: [
    { id: 1, time: "5:30 AM – 7:00 AM", type: "Cardio + Strength", trainer: "Rohan Patil",  slots: 12, booked: 8,  days: "Mon–Sat" },
    { id: 2, time: "7:00 AM – 9:00 AM", type: "General Fitness",   trainer: "Akash Shinde", slots: 15, booked: 11, days: "Mon–Sat" },
    { id: 3, time: "9:00 AM – 10:30 AM",type: "Yoga & Flexibility",trainer: "Sneha More",   slots: 10, booked: 4,  days: "Mon–Sat" },
    { id: 4, time: "6:00 PM – 7:30 PM", type: "CrossFit & HIIT",   trainer: "Akash Shinde", slots: 12, booked: 12, days: "Mon–Fri" },
    { id: 5, time: "7:30 PM – 9:00 PM", type: "Zumba & Cardio",    trainer: "Priya Desai",  slots: 15, booked: 7,  days: "Mon–Sat" },
    { id: 6, time: "9:00 PM – 10:00 PM",type: "Strength Training", trainer: "Rohan Patil",  slots: 10, booked: 5,  days: "Mon–Fri" }
  ],
  membership: {
    monthly:   { price: 999,  period: "month",  features: ["Unlimited gym access", "Locker facility", "1 group class/day", "Fitness assessment"] },
    quarterly: { price: 2499, period: "3 months",popular: true, features: ["Everything in Monthly", "1 Personal training session", "Diet consultation", "Guest pass (1/month)"] },
    annual:    { price: 7999, period: "year",    features: ["Everything in Quarterly", "4 Personal training sessions", "Full diet plan", "Body composition analysis", "Priority batch booking"] }
  },
  trainers: [
    { id: 1, name: "Rohan Patil",  speciality: "Strength & Conditioning", experience: "8 years", cert: "NSCA-CSCS", bio: "Former national-level powerlifter. Specialises in progressive overload and body recomposition." },
    { id: 2, name: "Priya Desai",  speciality: "Zumba & Cardio",          experience: "6 years", cert: "ACE Certified", bio: "Energy-packed Zumba instructor. Makes every session feel like a dance party." },
    { id: 3, name: "Akash Shinde", speciality: "CrossFit & HIIT",         experience: "7 years", cert: "CF-L2 Trainer", bio: "CrossFit Level 2 coach. Builds functional strength and mental toughness." },
    { id: 4, name: "Sneha More",   speciality: "Yoga & Flexibility",      experience: "9 years", cert: "RYT-500",      bio: "500-hour certified yoga teacher. Combines traditional yoga with modern mobility work." }
  ],
  freeTrial: {
    offer: "First session completely free",
    how: "Just walk in or WhatsApp us to book your slot",
    whatsappText: "Hi, I want to book a free trial session at PowerFit Gym"
  },
  faqs: [
    { q: "What are your timings?",           a: "Weekdays 5:30 AM–10:00 PM, Saturday 6:00 AM–8:00 PM, Sunday 7:00 AM–1:00 PM" },
    { q: "How much is monthly membership?",  a: "₹999/month. Quarterly is ₹2,499 and Annual is ₹7,999 with more benefits." },
    { q: "Do you offer a free trial?",       a: "Yes! Your first session is completely free. Walk in or WhatsApp us to book." },
    { q: "Which batch has availability?",    a: "Morning 9 AM yoga and evening 7:30 PM Zumba batches have slots. Others are mostly full." },
    { q: "Do you have personal trainers?",   a: "Yes, all 4 of our trainers offer 1-on-1 sessions. Quarterly and Annual plans include PT sessions." },
    { q: "Is there a locker facility?",      a: "Yes, all membership plans include locker access." }
  ]
};
```

---

## ⚡ netlify.toml — Exact Config

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[dev]
  command = "npm run dev"
  port = 5173
  targetPort = 5173

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔑 Environment Variables

```
# .env (local — NEVER commit)
CLAUDE_API_KEY=sk-ant-api03-...

# Set in Netlify Dashboard → Site Settings → Environment Variables (on Day 2 deploy)
CLAUDE_API_KEY=sk-ant-api03-...
```

---

## 🤝 How Agent Should Use Available Tools

**IMPORTANT: Always check what tools are available and use them actively.**

### GitHub MCP (already configured in .mcp.json)
- Use for: creating the repo, pushing commits, checking file status
- When to use: after completing each major section (Hero, Chatbot, etc.)
- Commit message format: `feat: add [component name] section`
- Never push broken builds — always test locally first

### /ui-ux-pro-max skill (already installed)
- Use for: styling decisions on every component
- Invoke when: building any new component to get design guidance
- Especially use for: Hero section, Membership cards, ChatBot widget
- Ask it for: dark theme gym aesthetics, card hover effects, mobile layouts

### frontend-design skill (install from claude-code-skills repo)
- Use for: production-grade component patterns
- Invoke when: any component feels generic or "AI-looking"
- Goal: site must look like a professional ₹50,000 build, not a template

### Hooks (PostToolUse lint check)
- After every file write, lint runs automatically
- If lint errors appear — fix immediately before moving to next component
- Never accumulate lint errors — fix as you go

---

## 📱 Responsive Breakpoints

| Breakpoint | Tailwind prefix | What changes |
|---|---|---|
| Mobile < 640px | (default) | Single column, hamburger nav, stacked cards |
| Tablet 640–1024px | sm: md: | 2-column grids, wider padding |
| Desktop > 1024px | lg: | Full layout, 3-column membership, side-by-side location |

**Mobile-first always.** Build mobile layout first, then add md: and lg: overrides.

---

## 🚀 Build Order (Day 1 — Stick to This)

```
09:00  Setup: npm create vite, tailwind, folder structure, gymData.js
09:30  Navbar + Hero (90 min)
11:00  ClassSchedule + MembershipPlans (90 min)
12:30  LUNCH
13:00  Trainers + Location + Footer (90 min)
14:30  ChatBot.jsx + chat-proxy.js (120 min) ← most important
16:30  WhatsApp button + mobile responsive fixes (60 min)
17:30  Local testing — test chatbot, all sections, mobile view
18:30  STATUS.md update + GitHub push
```

---

## ✅ Definition of Done (Before Day 2 Deploy)

- [ ] All 9 sections render correctly on desktop and mobile
- [ ] ChatBot answers: timings, pricing, trainer names, free trial
- [ ] ChatBot response ends with WhatsApp CTA
- [ ] WhatsApp floating button opens correct wa.me link
- [ ] Google Maps iframe loads (may need placeholder embed URL for demo)
- [ ] "Join Now" and "Start Free Trial" CTAs scroll to correct sections
- [ ] No console errors in browser dev tools
- [ ] `npm run build` completes without errors
- [ ] Committed to GitHub private repo

---

## 🎯 The Demo Script (For Client Meetings)

When showing this to a gym owner:
1. Open on mobile (they think mobile-first)
2. Show the hero — "This is YOUR gym, YOUR branding"
3. Scroll to membership cards — "Clients see pricing instantly, no calls needed"
4. Open chatbot — type "what are your timings?" → show instant answer at "11pm"
5. Show WhatsApp button — "Every button leads to YOUR WhatsApp"
6. Close with: "I can build this for your gym, customised, in 3 days."

---

## 📝 STATUS.md Template (Update As You Build)

```markdown
# PowerFit Gym — Build Status

## Completed
- [ ] Project setup
- [ ] gymData.js
- [ ] Navbar
- [ ] Hero
- [ ] ClassSchedule
- [ ] MembershipPlans
- [ ] Trainers
- [ ] Location
- [ ] Footer
- [ ] ChatBot widget (frontend)
- [ ] chat-proxy.js (Netlify function)
- [ ] WhatsApp button
- [ ] Mobile responsive
- [ ] Local test pass
- [ ] GitHub push

## Issues / Blockers
(note any bugs here)

## Next session
(what to do next time)
```

---

*Agent: You now have complete context. Start with `gymData.js` first — everything depends on it.*
*When in doubt about styling, invoke the /ui-ux-pro-max skill.*
*When in doubt about component pattern, invoke the frontend-design skill.*
*Commit to GitHub after every major section is working.*