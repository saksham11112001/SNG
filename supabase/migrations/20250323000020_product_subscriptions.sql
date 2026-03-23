-- supabase/migrations/20250323000020_product_subscriptions.sql
-- Run this in your Supabase SQL Editor.
-- This is the ONLY migration needed for the SNG Advisors site.
-- It tracks which user has access to which product and on what plan.

-- ── product_subscriptions ────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_subscriptions (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product     text        NOT NULL,
  -- 'planora' | 'flowos'
  plan        text        NOT NULL DEFAULT 'trial',
  -- 'trial' | 'starter' | 'growth' | 'business'
  status      text        NOT NULL DEFAULT 'active',
  -- 'active' | 'cancelled' | 'expired' | 'paused'
  started_at  timestamptz NOT NULL DEFAULT now(),
  expires_at  timestamptz,
  -- NULL = no expiry (paid plans); set for trials
  metadata    jsonb       NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT valid_product CHECK (product IN ('planora', 'flowos')),
  CONSTRAINT valid_plan    CHECK (plan    IN ('trial', 'starter', 'growth', 'business')),
  CONSTRAINT valid_status  CHECK (status  IN ('active', 'cancelled', 'expired', 'paused')),
  CONSTRAINT one_sub_per_product UNIQUE (user_id, product)
);

-- ── user_profiles ─────────────────────────────────────────────
-- Stores display name and avatar — synced from auth.users metadata.
CREATE TABLE IF NOT EXISTS user_profiles (
  id          uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text,
  avatar_url  text,
  company     text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Give every new user a free trial of BOTH products (14 days)
  INSERT INTO product_subscriptions (user_id, product, plan, status, expires_at)
  VALUES
    (NEW.id, 'planora', 'trial', 'active', now() + interval '14 days'),
    (NEW.id, 'flowos',  'trial', 'active', now() + interval '14 days')
  ON CONFLICT (user_id, product) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END;
$$;

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_subscriptions_updated_at
  BEFORE UPDATE ON product_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_product_subscriptions_user
  ON product_subscriptions(user_id, product, status);

-- ── RLS ───────────────────────────────────────────────────────
ALTER TABLE product_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles          ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscriptions
CREATE POLICY "users read own subscriptions"
  ON product_subscriptions FOR SELECT
  USING (user_id = auth.uid());

-- Only service role can insert/update subscriptions (no self-grant)
-- Use Supabase dashboard or server-side admin client for billing updates.

-- Users can read and update their own profile
CREATE POLICY "users read own profile"
  ON user_profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "users update own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid());
