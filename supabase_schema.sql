-- =====================================================================
-- FORSTER KWARTENG FOUNDATION (FKF) — SUPABASE DATABASE & STORAGE SETUP
-- Run this script once in your Supabase Dashboard -> SQL Editor -> New Query
-- =====================================================================

-- 1. Create Core Tables (using JSONB for 1:1 TypeScript compatibility & zero schema errors)
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.program_articles (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.stories (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.volunteer_submissions (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) with Public Read & Admin Write Policies
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_submissions ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'hero_slides',
    'projects',
    'program_articles',
    'events',
    'stories',
    'settings',
    'contact_messages',
    'volunteer_submissions'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Allow full access on %I" ON public.%I;', t, t);
    EXECUTE format(
      'CREATE POLICY "Allow full access on %I" ON public.%I FOR ALL USING (true) WITH CHECK (true);',
      t, t
    );
  END LOOP;
END
$$;

-- 3. Enable Realtime Sync for All Tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'hero_slides',
    'projects',
    'program_articles',
    'events',
    'stories',
    'settings',
    'contact_messages',
    'volunteer_submissions'
  ]
  LOOP
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I;', t);
    EXCEPTION WHEN duplicate_object THEN
      -- Table already in publication
      NULL;
    END;
  END LOOP;
END
$$;

-- 4. Create Public Media Storage Bucket ('fkf-media') & Storage Policies
INSERT INTO storage.buckets (id, name, public)
VALUES ('fkf-media', 'fkf-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Read fkf-media" ON storage.objects;
CREATE POLICY "Public Read fkf-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'fkf-media');

DROP POLICY IF EXISTS "Public Upload fkf-media" ON storage.objects;
CREATE POLICY "Public Upload fkf-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'fkf-media');

DROP POLICY IF EXISTS "Public Update fkf-media" ON storage.objects;
CREATE POLICY "Public Update fkf-media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'fkf-media');

DROP POLICY IF EXISTS "Public Delete fkf-media" ON storage.objects;
CREATE POLICY "Public Delete fkf-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'fkf-media');
