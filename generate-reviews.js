#!/usr/bin/env node

/**
 * AI Affiliate Site Generator
 * Generates review pages from tool database
 */

const fs = require('fs');
const path = require('path');

// Tool data
const tools = [
    {
        id: 'claude',
        name: 'Claude',
        icon: '🧠',
        badge: 'Best for Writing',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        price: '$20/month',
        rating: 4.9,
        pros: ['Long 200K context window', 'Thoughtful, nuanced responses', 'Excellent writing quality', 'Strong analytical abilities', 'Ethical AI approach'],
        cons: ['Slower responses', 'More cautious responses', 'Limited knowledge cutoff', 'No image generation'],
        verdict: 'Claude is the best choice for long-form content writing, analysis, and nuanced conversations. The 200K context window is unmatched.',
        bestFor: 'Writers, researchers, analysts, and anyone needing deep thinking assistance.',
        affiliateLink: 'https://claude.ai'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        icon: '🎨',
        badge: 'Best AI Art',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        price: '$10/month',
        rating: 4.7,
        pros: ['Stunning artistic quality', 'Active Discord community', 'Constantly improving', 'Great for concept art', 'Unique style'],
        cons: ['Discord-only interface', 'Can be slow during busy periods', 'Subscription required', 'No free tier'],
        verdict: 'Midjourney produces the most beautiful AI art available. The Discord-based workflow takes getting used to, but the results are worth it.',
        bestFor: 'Artists, designers, concept artists, and anyone needing high-quality AI-generated images.',
        affiliateLink: 'https://midjourney.com'
    },
    {
        id: 'github-copilot',
        name: 'GitHub Copilot',
        icon: '💻',
        badge: 'Best for Developers',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        price: '$10/month',
        rating: 4.6,
        pros: ['Saves significant coding time', 'Learns from your code style', 'Supports many languages', 'IDE integration', 'Trusted by millions'],
        cons: ['Code quality varies', 'Privacy concerns', 'Requires subscription for full features', 'Not always accurate'],
        verdict: 'GitHub Copilot is essential for developers who want to code faster. The AI suggestions integrate seamlessly into your workflow.',
        bestFor: 'Software developers, data scientists, and anyone who writes code regularly.',
        affiliateLink: 'https://github.com/features/copilot'
    },
    {
        id: 'jasper',
        name: 'Jasper',
        icon: '✍️',
        badge: 'Best for Marketing',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        price: '$49/month',
        rating: 4.5,
        pros: ['Marketing-specific templates', 'Brand voice features', 'Team collaboration tools', 'Multi-language support', 'Campaign management'],
        cons: ['Expensive', 'Learning curve', 'Can feel robotic', 'Steep learning curve'],
        verdict: 'Jasper is the ultimate AI marketing platform. At $49/month, it\'s pricier but offers unmatched marketing-specific features.',
        bestFor: 'Marketing teams, content agencies, and businesses with high content needs.',
        affiliateLink: 'https://jasper.ai'
    },
    {
        id: 'notion-ai',
        name: 'Notion AI',
        icon: '📝',
        badge: 'Best All-in-One',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        price: '$10/user/month',
        rating: 4.4,
        pros: ['Integrated with Notion workspace', 'Clean, familiar interface', 'Multiple AI features in one place', 'Good for team collaboration'],
        cons: ['Requires Notion subscription', 'Limited outside Notion', 'Extra $10/month on top of Notion'],
        verdict: 'Notion AI transforms your existing workspace. Perfect if you already use Notion for productivity.',
        bestFor: 'Notion users, teams, and anyone wanting AI assistance within their workspace.',
        affiliateLink: 'https://notion.so'
    }
];

const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{NAME}} Review 2025 - Is It Worth It?</title>
    <meta name="description" content="Our honest, in-depth review of {{NAME}}. Pricing, features, pros & cons, and alternatives. Is it worth {{PRICE}}?">
    <link rel="stylesheet" href="styles.css">
    <style>
        .review-hero { background: {{GRADIENT}}; color: white; padding: 60px 0; text-align: center; }
        .review-content { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .review-sidebar { max-width: 300px; margin: 40px auto; padding: 25px; background: white; border-radius: 12px; box-shadow: var(--shadow); text-align: center; }
        .rating-box { font-size: 3rem; color: #fbbf24; margin: 15px 0; }
        .pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 40px 0; }
        .pros, .cons { background: white; padding: 25px; border-radius: 12px; box-shadow: var(--shadow); }
        .pros h3 { color: #10b981; }
        .cons h3 { color: #ef4444; }
        .pros ul li::before { content: '✓ '; color: #10b981; font-weight: bold; }
        .cons ul li::before { content: '✗ '; color: #ef4444; font-weight: bold; }
        .verdict { background: {{GRADIENT}}; color: white; padding: 40px; border-radius: 12px; text-align: center; margin: 40px 0; }
        .comparison-table { width: 100%; border-collapse: collapse; margin: 30px 0; background: white; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow); }
        .comparison-table th, .comparison-table td { padding: 15px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        .comparison-table th { background: #f8fafc; font-weight: 600; }
        .affiliate-btn { display: inline-block; padding: 15px 40px; background: #2563eb; color: white; font-size: 1.1rem; font-weight: bold; border-radius: 10px; margin: 20px 0; }
        .affiliate-btn:hover { transform: scale(1.05); }
        @media (max-width: 768px) { .pros-cons { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="index.html" class="logo">🤖 AI Tools Solutions</a>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="categories.html">Categories</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="blog.html">Blog</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="review-hero">
        <div class="container">
            <h1>{{ICON}} {{NAME}} Review 2025</h1>
            <p>{{BADGE}} - Is it worth {{PRICE}}?</p>
        </div>
    </section>

    <div class="review-content">
        <div class="review-sidebar">
            <h2>{{NAME}}</h2>
            <div class="rating-box">{{STARS}}</div>
            <p class="tool-price">{{PRICE}}</p>
            <a href="{{AFFILIATE}}" class="affiliate-btn" onclick="trackAffiliate('{{ID}}')">
                Try {{NAME}} Free →
            </a>
            <p style="font-size: 0.8rem; opacity: 0.7;">*We may earn a commission</p>
        </div>

        <h2>What is {{NAME}}?</h2>
        <p>{{DESCRIPTION}}</p>

        <h2>Key Features</h2>
        <ul>
            <li><strong>AI-Powered:</strong> Advanced artificial intelligence capabilities</li>
            <li><strong>User-Friendly:</strong> Intuitive interface and easy to get started</li>
            <li><strong>Cross-Platform:</strong> Works on web, mobile, and desktop</li>
            <li><strong>Regular Updates:</strong> Constantly improving with new features</li>
            <li><strong>Community:</strong> Active user community and support</li>
        </ul>

        <div class="pros-cons">
            <div class="pros">
                <h3>✅ Pros</h3>
                <ul>
{{PROS_LIST}}
                </ul>
            </div>
            <div class="cons">
                <h3>❌ Cons</h3>
                <ul>
{{CONS_LIST}}
                </ul>
            </div>
        </div>

        <h2>Pricing</h2>
        <table class="comparison-table">
            <tr>
                <th>Plan</th>
                <th>Price</th>
                <th>Features</th>
            </tr>
            <tr>
                <td>Free</td>
                <td>$0</td>
                <td>Basic features, limited usage</td>
            </tr>
            <tr>
                <td>Pro</td>
                <td>{{PRICE}}</td>
                <td>Full access, priority support</td>
            </tr>
            <tr>
                <td>Team</td>
                <td>Custom</td>
                <td>Collaboration features, admin tools</td>
            </tr>
        </table>

        <div class="verdict">
            <h2>🎯 Our Verdict</h2>
            <p><strong>Rating: {{RATING}}/5</strong></p>
            <p style="margin-top: 15px;">{{VERDICT}}</p>
            <p style="margin-top: 15px;"><strong>Best for:</strong> {{BEST_FOR}}</p>
        </div>

        <h2>Alternatives to Consider</h2>
        <ul>
            <li><strong>ChatGPT:</strong> The most popular AI chatbot</li>
            <li><strong>Claude:</strong> Great for long-form content</li>
            <li><strong>Perplexity:</strong> Best for research</li>
            <li><strong>Google Gemini:</strong> Integrated with Google services</li>
        </ul>

        <div style="text-align: center; margin-top: 40px;">
            <a href="{{AFFILIATE}}" class="affiliate-btn" onclick="trackAffiliate('{{ID}}')">
                Try {{NAME}} Free →
            </a>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="footer-bottom">
                <p>© 2025 AI Tools Solutions. All rights reserved.</p>
                <p class="affiliate-disclosure">Disclosure: We may earn commissions from qualifying purchases through our links.</p>
            </div>
        </div>
    </footer>

    <script>
        function trackAffiliate(toolId) {
            let clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
            clicks.push({ tool: toolId, time: new Date().toISOString() });
            localStorage.setItem('affiliateClicks', JSON.stringify(clicks.slice(-100)));
            console.log('Affiliate click tracked:', toolId);
        }
    </script>
</body>
</html>
`;

function generateStars(rating) {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
}

function generateReview(tool) {
    let content = template
        .replace(/\{\{NAME\}\}/g, tool.name)
        .replace(/\{\{ICON\}\}/g, tool.icon)
        .replace(/\{\{BADGE\}\}/g, tool.badge)
        .replace(/\{\{PRICE\}\}/g, tool.price)
        .replace(/\{\{GRADIENT\}\}/g, tool.gradient)
        .replace(/\{\{RATING\}\}/g, tool.rating)
        .replace(/\{\{ID\}\}/g, tool.id)
        .replace(/\{\{STARS\}\}/g, generateStars(tool.rating))
        .replace(/\{\{VERDICT\}\}/g, tool.verdict)
        .replace(/\{\{BEST_FOR\}\}/g, tool.bestFor)
        .replace(/\{\{AFFILIATE\}\}/g, tool.affiliateLink)
        .replace(/\{\{DESCRIPTION\}\}/g, `${tool.name} is a leading AI tool in its category. It offers powerful features for users looking to enhance their productivity and workflow with artificial intelligence.`);

    const prosList = tool.pros.map(p => `<li>${p}</li>`).join('\n');
    const consList = tool.cons.map(c => `<li>${c}</li>`).join('\n');

    return content
        .replace('{{PROS_LIST}}', prosList)
        .replace('{{CONS_LIST}}', consList);
}

// Generate all review pages
const siteDir = path.join(__dirname);

tools.forEach(tool => {
    const filename = `review-${tool.id}.html`;
    const content = generateReview(tool);
    fs.writeFileSync(path.join(siteDir, filename), content);
    console.log(`✓ Generated: ${filename}`);
});

console.log(`\n✅ Generated ${tools.length} review pages!`);
