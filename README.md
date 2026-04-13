# ConciergeAI Expert Recruitment CRM v3.0

Internal dashboard for managing expert leads with industry-specific, multi-language invitation templates.

## Features
- 8 industry-specific templates (Tutor, Plumber, Lawyer, Accountant, Renovation, Photographer, Fitness, Generic)
- 7 languages (EN, Traditional Chinese, Simplified Chinese, Arabic, Polish, Hindi, Urdu)
- WhatsApp live chat panel with template preview
- Template management panel (Industry x Language x Channel)
- Real-time stats, filters, and CRUD operations

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/conciergeai-crm)

## Local Development

```bash
npm install
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key
npm run dev
```

## Supabase Setup
1. Create a Supabase project
2. Run `supabase-schema.sql` in the SQL Editor
3. Add env vars to Vercel or `.env.local`
