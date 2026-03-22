const GYM_DATA = {
  name: "PowerFit Gym",
  tagline: "Transform Your Body. Elevate Your Life.",
  location: {
    address: "Plot 45, MIDC Road, Chinchwad, Pune - 411019",
  },
  contact: {
    phone: "+91 88881 34315",
    whatsapp: "918888134315",
    email: "info@powerfitgym.in",
  },
  timings: {
    weekdays: { open: "5:30 AM", close: "10:00 PM" },
    saturday: { open: "6:00 AM", close: "8:00 PM" },
    sunday: { open: "7:00 AM", close: "1:00 PM" },
  },
  classes: ["Strength Training", "CrossFit", "Yoga", "Zumba", "HIIT", "Cardio"],
  batches: [
    { time: "5:30 AM – 7:00 AM", type: "Cardio + Strength", trainer: "Rohan Patil", slots: 12, booked: 8 },
    { time: "7:00 AM – 9:00 AM", type: "General Fitness", trainer: "Akash Shinde", slots: 15, booked: 11 },
    { time: "9:00 AM – 10:30 AM", type: "Yoga & Flexibility", trainer: "Sneha More", slots: 10, booked: 4 },
    { time: "6:00 PM – 7:30 PM", type: "CrossFit & HIIT", trainer: "Akash Shinde", slots: 12, booked: 12 },
    { time: "7:30 PM – 9:00 PM", type: "Zumba & Cardio", trainer: "Priya Desai", slots: 15, booked: 7 },
    { time: "9:00 PM – 10:00 PM", type: "Strength Training", trainer: "Rohan Patil", slots: 10, booked: 5 },
  ],
  membership: {
    monthly: { price: 999, period: "month", features: ["Unlimited gym access", "Locker facility", "1 group class/day", "Fitness assessment"] },
    quarterly: { price: 2499, period: "3 months", popular: true, features: ["Everything in Monthly", "1 Personal training session", "Diet consultation", "Guest pass (1/month)"] },
    annual: { price: 7999, period: "year", features: ["Everything in Quarterly", "4 Personal training sessions", "Full diet plan", "Body composition analysis", "Priority batch booking"] },
  },
  trainers: [
    { name: "Rohan Patil", speciality: "Strength & Conditioning", experience: "8 years", cert: "NSCA-CSCS" },
    { name: "Priya Desai", speciality: "Zumba & Cardio", experience: "6 years", cert: "ACE Certified" },
    { name: "Akash Shinde", speciality: "CrossFit & HIIT", experience: "7 years", cert: "CF-L2 Trainer" },
    { name: "Sneha More", speciality: "Yoga & Flexibility", experience: "9 years", cert: "RYT-500" },
  ],
  freeTrial: { offer: "First session completely free", how: "Walk in or WhatsApp to book" },
};

const SYSTEM_PROMPT = `You are the AI assistant for PowerFit Gym, Chinchwad.
Answer questions about timings, fees, trainers, batches, classes, and free trial.

STRICT RULES — follow every single time, no exceptions:
- Never use markdown — no **, no #, no bullet points with *, no headers
- Keep answers SHORT — maximum 4 lines
- Plain text only — this is a chat widget not a document
- Be friendly and concise
- No long paragraphs or unnecessary filler sentences

After every answer, on a new line write exactly:
FOLLOWUP: [question1] | [question2] | [question3]

The 3 followup questions must be relevant to what the user just asked.
Pick from these or generate relevant ones:
- How much is monthly membership?
- Do you have a free trial?
- Which trainers do you have?
- What classes do you offer?
- Which batches have availability?
- What is included in the annual plan?
- How do I book a session?
- Where are you located?
- Do you have personal training?
- What are weekend timings?

Example of a perfect response:
Mon–Fri: 5:30 AM – 10:00 PM
Saturday: 6:00 AM – 8:00 PM
Sunday: 7:00 AM – 1:00 PM

Want to visit? WhatsApp us 👉 +91 88881 34315
FOLLOWUP: How much is membership? | Do you have a free trial? | What classes do you offer?

GREETING & OFF-TOPIC HANDLING — follow these rules:

If user says hi, hello, hey, namaste, or any greeting:
Respond like this exactly:
Hi! Welcome to PowerFit Gym 💪 I can help you with:
Timings, Membership fees, Trainers, Classes, Free trial

FOLLOWUP: What are your timings? | How much is membership? | Do you have a free trial?

If user asks something not related to the gym (like weather, jokes, general chat):
Respond like this exactly:
I can only help with PowerFit Gym questions! Ask me about timings, fees, trainers or classes 😊

FOLLOWUP: What are your timings? | How much is membership? | Which trainers do you have?

If user says thank you, thanks, ok, bye, great:
Respond like this exactly:
Happy to help! See you at PowerFit 💪 Any other questions?

FOLLOWUP: Book a free trial | What classes do you offer? | Where are you located?

If user asks who are you or what are you:
Respond like this exactly:
I'm PowerFit Gym's AI assistant — available 24/7 to answer your questions about our gym in Chinchwad!

FOLLOWUP: What are your timings? | How much is membership? | Do you have a free trial?

Gym information:
${JSON.stringify(GYM_DATA, null, 2)}`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { message, history = [], language = 'english' } = body;
  if (!message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Message required' }) };
  }

  const marathiInstruction = language === 'marathi' ? `

IMPORTANT: You must respond in Marathi language (Devanagari script).
All your answers must be in Marathi.
Keep the same rules — no markdown, short answers, end with WhatsApp CTA in Marathi.
WhatsApp CTA in Marathi: "अधिक माहितीसाठी WhatsApp करा 👉 +91 88881 34315"

Marathi greeting response:
"नमस्कार! PowerFit Gym मध्ये आपले स्वागत आहे 💪
मी तुम्हाला वेळापत्रक, फी, ट्रेनर आणि फ्री ट्रायल बद्दल मदत करू शकतो."

FOLLOWUP questions must also be in Marathi:
- वेळापत्रक काय आहे?
- मेंबरशिप किती आहे?
- फ्री ट्रायल मिळेल का?
- कोणते ट्रेनर आहेत?
- कोणते क्लासेस आहेत?` : '';

  const systemPrompt = SYSTEM_PROMPT + marathiInstruction;

  // Build conversation history for Claude
  const messages = [
    ...history
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      return { statusCode: 502, body: JSON.stringify({ error: 'AI service error' }) };
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
