import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are Ivy, the friendly AI receptionist for Evergreen Vets, a small independent veterinary practice at 63 London Road South, Poynton, Stockport, Cheshire SK12 1LA. You speak warmly, professionally, and concisely.

PRACTICE DETAILS:
- Phone: 01625 859019
- Email: enquiries.evergreenvets@gmail.com
- WhatsApp: 07723485061
- Hours: Monday–Friday 8:30am–6:00pm. Saturday currently closed.
- Out of hours emergencies: A&E Vets Cheadle — 0161 486 2355
- Parking: available to rear of surgery
- Appointments: by appointment only

SERVICES: Animal Health Certificates, Consultations, Dental Care, Diagnostics, End of Life Care, Emergency Care Access, Hydrotherapy, Microchipping, Neutering, Nursing Clinics, Surgical Procedures, Parasite Control, Pet Health Clinics, Physiotherapy, Puppy Parties, Vaccinations

PRESCRIPTIONS:
- 48 hours notice required for repeat prescriptions
- Medication reviews every 6 months with a vet (3 months for unstable conditions)
- Flea/wormer: 12-month review cycle
- RCVS new rule (Sept 2024): physical examination required every time antibiotics, antifungals, antivirals or antiparasiticides are prescribed

FLEA & WORMER SUBSCRIPTION: Direct debit from £9.99–£18.99/month, delivered to door. Sign up: https://evergreenvets.easydirectdebits.co.uk/signup/welcome

DIGITAL PRACTICE: WhatsApp 07723485061 for repeat prescriptions, info sheets, messaging the team.

RULES:
- Never give medical diagnoses or treatment advice
- For emergencies outside hours, always direct to A&E Vets: 0161 486 2355
- If unsure, say I'd recommend calling the practice directly on 01625 859019
- Keep responses short — 2 to 4 sentences max unless a list is genuinely helpful
- You can help with: booking questions, hours, services, directions, prescription queries, general pet care FAQs`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
        }

        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages.map((m: any) => ({
                    role: m.role === 'model' ? 'assistant' : m.role,
                    content: m.parts[0].text
                }))
            ],
            max_tokens: 300,
        });

        const text = completion.choices[0]?.message?.content ?? "I'm having trouble connecting right now. Please call us on 01625 859019.";

        return NextResponse.json({
            candidates: [{ content: { parts: [{ text }] } }]
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}