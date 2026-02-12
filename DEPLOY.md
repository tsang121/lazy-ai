# Deploy LazyAI to Live Server

## Option 1: Railway (Recommended) - Easiest

1. Go to: https://railway.new
2. Click **"Deploy from GitHub repo"**
3. Search: `lazy-ai`
4. Select: `tsang121/lazy-ai`
5. Done! Your site will be live at: `https://lazy-ai.up.railway.app`

## Option 2: Vercel (Fast)

```bash
npx vercel --yes
```

## Option 3: Netlify (Simple)

```bash
npm install -g netlify-cli
netlify deploy --dir=. --prod
```

## Option 4: Railway CLI (If Logged In)

```bash
railway login
railway up
```

## Quick Deploy Script

```bash
cd /Users/minimad/.openclaw/workspace/lazy-ai
./deploy.sh
```

## After Deployment

1. Add your affiliate links to `review-*.html` files
2. Replace `#` in buttons with your affiliate URLs
3. Test all links work correctly

---

**Repo URL:** https://github.com/tsang121/lazy-ai
