-- ConciergeAI Expert Recruitment CRM — Supabase Schema
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS experts (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  phone       text NOT NULL,
  email       text NOT NULL,
  trade       text NOT NULL,
  location    text NOT NULL,
  source      text NOT NULL DEFAULT '其他',
  status      text NOT NULL DEFAULT '新线索',
  notes       text DEFAULT '',
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_experts_trade ON experts (trade);
CREATE INDEX IF NOT EXISTS idx_experts_location ON experts (location);
CREATE INDEX IF NOT EXISTS idx_experts_status ON experts (status);

ALTER TABLE experts ENABLE ROW LEVEL SECURITY;

-- For development: allow all operations without auth
CREATE POLICY "Allow all for anon" ON experts FOR ALL USING (true) WITH CHECK (true);
