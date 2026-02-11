# 🤖 LazyAI - Affiliate Site

An automated affiliate website for AI tools reviews. Built to generate passive income through AI tool recommendations.

## 🌟 Features

- **10+ Review Pages** - ChatGPT, Claude, Midjourney, Jasper, and more
- **SEO Optimized** - Built for Google rankings
- **Affiliate Links** - Monetized with product recommendations
- **Fully Automated** - Weekly content updates via cron
- **Responsive Design** - Works on mobile and desktop

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start local server
npm start

# Generate review pages
npm run generate

# Run automation
npm run automate
```

### Deploy to Railway (Free Tier)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial AI affiliate site"
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-site.git
git push -u origin main
```

2. Deploy on Railway:
```bash
# Install Railway CLI
npm i -g railway

# Login and deploy
railway login
railway init
railway up
```

### Free Deployment Options

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Enable in repo settings

## 📁 Site Structure

```
affiliate-site/
├── index.html          # Homepage with featured tools
├── styles.css          # All styles
├── app.js              # Frontend JavaScript
├── generate-reviews.js # Generate review pages
├── automate.js         # Weekly automation script
├── review-*.html       # Individual tool reviews
└── category-*.html     # Category pages
```

## 💰 How It Makes Money

### Affiliate Programs

| Program | Commission | Product |
|---------|------------|---------|
| ChatGPT/OpenAI | 20% | AI subscriptions |
| Jasper | 20-30% | Marketing tools |
| Midjourney | 10-20% | Image generation |
| GitHub Copilot | 20% | Developer tools |

### Revenue Estimates

| Month | Traffic | Revenue |
|-------|---------|---------|
| 1-3 | 100-500/mo | $0-50 |
| 4-6 | 1,000-2,000/mo | $100-300 |
| 7-12 | 5,000+/mo | $500-1,000+ |

## 🔄 Automation Setup

### Cron Job (Every Monday at 9 AM)

```bash
# Edit crontab
crontab -e

# Add this line:
0 9 * * 1 cd /path/to/affiliate-site && node automate.js --run >> automation.log 2>&1
```

### What Automation Does

1. Generates updated review pages
2. Updates site statistics
3. Deploys to Railway
4. Sends weekly report

## 📈 SEO Strategy

### Target Keywords

- "best AI tools 2025"
- "ChatGPT alternatives"
- "AI writing tools"
- "AI image generators"
- "Midjourney review"

### Backlink Strategy

1. Submit to AI directories
2. Guest post on tech blogs
3. Social media shares
4. Community engagement (Reddit, Hacker News)

## 📊 Analytics Setup

Replace the Google Analytics ID in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🛠️ Customization

### Change Colors

Edit `:root` in `styles.css`:

```css
:root {
    --primary: #2563eb;       /* Change main color */
    --secondary: #10b981;     /* Change accent color */
    --dark: #1e293b;         /* Change dark color */
}
```

### Add New Tools

Edit `generate-reviews.js` and add to the `tools` array:

```javascript
{
    id: 'new-tool',
    name: 'New Tool',
    icon: '🔧',
    badge: 'Best for X',
    price: '$X/mo',
    rating: 4.5,
    pros: ['Pro 1', 'Pro 2', 'Pro 3'],
    cons: ['Con 1', 'Con 2'],
    verdict: 'Your verdict here.',
    bestFor: 'Who should use this.',
    affiliateLink: 'https://...'
}
```

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Support

Questions? Open an issue on GitHub.

---

**⚠️ Disclaimer**: This site earns commissions through affiliate links. We only recommend tools we've researched and believe provide value.
