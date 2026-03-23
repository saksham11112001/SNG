# SNG Advisors — Complete Install Guide
## Every step, in order. Do not skip any.

---

## PART A — Supabase Setup (do this first)

### A1. Create a Supabase project
1. Go to https://supabase.com
2. Click "New project"
3. Name it: `sng-advisors` (this ONE project is shared by all 3 apps)
4. Choose a region close to India (e.g. Singapore)
5. Set a strong database password — save it
6. Wait ~2 minutes for it to provision

### A2. Get your API keys
1. Go to your project → Settings → API
2. Copy these two values — you'll need them in every app:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### A3. Configure Auth settings
1. Go to Authentication → URL Configuration
2. Set Site URL to: `http://localhost:3000` (for dev) / `https://sngadvisors.com` (for prod)
3. Add these to Redirect URLs (one per line):
   ```
   http://localhost:3000/auth/callback
   https://sngadvisors.com/auth/callback
   ```
4. Save

### A4. Run the migration
1. Go to SQL Editor in your Supabase dashboard
2. Click "New query"
3. Open the file: `supabase/migrations/20250323000020_product_subscriptions.sql`
4. Paste the entire contents into the SQL editor
5. Click "Run"
6. Verify it worked by running:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_name IN ('product_subscriptions', 'user_profiles');
   ```
   You should see 2 rows.

---

## PART B — SNG Advisors App Setup

### B1. Create the project
```bash
# Option 1: Use this repo directly
cd sng-advisors
npm install

# Option 2: Start fresh with create-next-app (copy files over after)
npx create-next-app@latest sng-advisors --typescript --tailwind --app --no-src-dir
```

### B2. Copy project files
If you started fresh with create-next-app, copy ALL files from this zip
into the project folder, overwriting the defaults.

### B3. Set up environment variables
```bash
cp .env.example .env.local
```
Now open `.env.local` and fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_COOKIE_DOMAIN=localhost
NEXT_PUBLIC_PLANORA_URL=http://localhost:3001
NEXT_PUBLIC_FLOWOS_URL=http://localhost:3002
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### B4. Run the dev server
```bash
npm run dev
```
Visit: http://localhost:3000

You should see the dark landing page with the SNG Advisors brand.

### B5. Test the auth flow
1. Go to http://localhost:3000/signup
2. Create an account with your email
3. Check your email — Supabase sends a confirmation link
4. Click it — you should be redirected to http://localhost:3000/dashboard
5. You should see both product cards (Planora and FlowOS) showing "Trial"
6. Go to http://localhost:3000/login — it should redirect you to /dashboard (already logged in)

---

## PART C — Production Deployment (Vercel)

### C1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: SNG Advisors initial setup"
git remote add origin https://github.com/planora-hq/sng-advisors.git
git push -u origin main
```

### C2. Deploy to Vercel
1. Go to https://vercel.com → New Project
2. Import your `sng-advisors` GitHub repo
3. Framework: Next.js (auto-detected)
4. Add environment variables (same as .env.local but with production values):
   ```
   NEXT_PUBLIC_SUPABASE_URL       = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = your-anon-key
   NEXT_PUBLIC_COOKIE_DOMAIN      = .sngadvisors.com
   NEXT_PUBLIC_PLANORA_URL        = https://tasks.sngadvisors.com
   NEXT_PUBLIC_FLOWOS_URL         = https://fms.sngadvisors.com
   NEXT_PUBLIC_SITE_URL           = https://sngadvisors.com
   ```
5. Deploy

### C3. Set up custom domain
1. In Vercel → your project → Domains
2. Add: `sngadvisors.com`
3. Add: `www.sngadvisors.com`
4. In your domain registrar (GoDaddy / Namecheap etc.), add the DNS records Vercel shows you

### C4. Update Supabase for production
1. Go to Supabase → Authentication → URL Configuration
2. Change Site URL to: `https://sngadvisors.com`
3. Ensure `https://sngadvisors.com/auth/callback` is in Redirect URLs

---

## PART D — What to do after this

Once the SNG Advisors site is running:

1. **Update Planora** (see `../planora-changes/` folder):
   - Add the shared Supabase client (with `.sngadvisors.com` cookie)
   - Update middleware to redirect to sngadvisors.com/login
   - Remove Planora's own login/signup pages

2. **Build FlowOS** as a new standalone repo at `fms.sngadvisors.com`
   - Same Supabase project URL and keys
   - Same cookie domain
   - Deploy to Vercel at `fms.sngadvisors.com`

---

## Common Errors & Fixes

### "Invalid redirect URL"
→ Add the callback URL to Supabase Auth → URL Configuration → Redirect URLs

### Logged in but redirected to /login in Planora or FlowOS
→ The cookie domain isn't matching. In production make sure
  `NEXT_PUBLIC_COOKIE_DOMAIN=.sngadvisors.com` (with the leading dot)
  in ALL THREE apps.

### Dashboard shows "no plan" for products
→ The `handle_new_user` trigger didn't fire. Manually insert a row:
  ```sql
  INSERT INTO product_subscriptions (user_id, product, plan, status, expires_at)
  VALUES ('your-user-uuid', 'planora', 'trial', 'active', now() + interval '14 days');
  ```

### Cookie not shared between localhost:3000 and localhost:3001
→ This is expected in local dev — browsers don't share cookies between
  different ports on localhost. To test SSO locally, use one of these:
  Option A: Add to your /etc/hosts:
    ```
    127.0.0.1   dev.sngadvisors.com
    127.0.0.1   tasks.dev.sngadvisors.com
    ```
  Then set NEXT_PUBLIC_COOKIE_DOMAIN=.dev.sngadvisors.com in all apps.
  Option B: Just test SSO in production — it works fine there.
