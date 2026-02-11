// Tool Database - Easy to expand
const toolsDatabase = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        icon: '🤖',
        category: 'writing',
        badge: 'Best Overall',
        rating: 4.8,
        price: '$20/mo',
        description: 'The most popular AI chatbot. Great for writing, coding, brainstorming, and general assistance.',
        pros: ['Easy to use', 'Wide knowledge base', 'Strong coding abilities'],
        cons: ['Knowledge cutoff', 'Can hallucinate', 'Limited context window'],
        affiliateLink: 'https://chat.openai.com',
        featured: true
    },
    {
        id: 'claude',
        name: 'Claude',
        icon: '🧠',
        category: 'writing',
        badge: 'Best for Writing',
        rating: 4.9,
        price: '$20/mo',
        description: 'Anthropic\'s AI assistant. Excellent for long-form content, analysis, and nuanced conversations.',
        pros: ['Long context window', 'Thoughtful responses', 'Strong writing'],
        cons: ['Slower responses', 'More cautious', 'Limited knowledge'],
        affiliateLink: 'https://claude.ai',
        featured: true
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        icon: '🎨',
        category: 'images',
        badge: 'Best AI Art',
        rating: 4.7,
        price: '$10/mo',
        description: 'The leading AI image generator. Creates stunning artwork from text descriptions.',
        pros: ['Beautiful results', 'Active community', 'Constantly improving'],
        cons: ['Discord-only', 'Can be slow', 'Subscription required'],
        affiliateLink: 'https://midjourney.com',
        featured: true
    },
    {
        id: 'jasper',
        name: 'Jasper',
        icon: '✍️',
        category: 'writing',
        badge: 'Best for Marketing',
        rating: 4.5,
        price: '$49/mo',
        description: 'AI content platform for marketing teams. Templates for blogs, ads, social media, and more.',
        pros: ['Marketing templates', 'Brand voice features', 'Team collaboration'],
        cons: ['Expensive', 'Learning curve', 'Can feel robotic'],
        affiliateLink: 'https://jasper.ai',
        featured: false
    },
    {
        id: 'github-copilot',
        name: 'GitHub Copilot',
        icon: '💻',
        category: 'coding',
        badge: 'Best for Devs',
        rating: 4.6,
        price: '$10/mo',
        description: 'AI pair programmer. Suggests code as you type, supporting multiple languages.',
        pros: ['Saves time', 'Learns from context', 'Widely supported'],
        cons: ['Code quality varies', 'Subscription needed', 'Privacy concerns'],
        affiliateLink: 'https://github.com/features/copilot',
        featured: true
    },
    {
        id: 'notion-ai',
        name: 'Notion AI',
        icon: '📝',
        category: 'productivity',
        badge: 'Best All-in-One',
        rating: 4.4,
        price: '$10/user/mo',
        description: 'AI features built into Notion. Writing assistance, summarization, and task management.',
        pros: ['Integrated experience', 'Clean interface', 'Multiple AI features'],
        cons: ['Requires Notion', 'Limited outside Notion', 'Extra cost'],
        affiliateLink: 'https://notion.so',
        featured: false
    },
    {
        id: 'canva',
        name: 'Canva AI',
        icon: '🎬',
        category: 'design',
        badge: 'Best for Beginners',
        rating: 4.5,
        price: '$13/mo',
        description: 'Design platform with AI features. Magic Write, image generation, and easy templates.',
        pros: ['Beginner-friendly', 'Huge template library', 'All-in-one'],
        cons: ['Design limitations', 'Watermark on free', 'Can be cluttered'],
        affiliateLink: 'https://canva.com',
        featured: false
    },
    {
        id: 'runway',
        name: 'Runway',
        icon: '🎥',
        category: 'video',
        badge: 'Best AI Video',
        rating: 4.3,
        price: '$12/mo',
        description: 'AI video generation and editing. Text-to-video, background removal, and more.',
        pros: ['Cutting-edge AI', 'Video editing', 'Collaboration features'],
        cons: ['Learning curve', 'Credit system', 'Still evolving'],
        affiliateLink: 'https://runwayml.com',
        featured: false
    }
];

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedTools();
    renderLatestReviews();
    setupSearch();
    trackVisit();
});

// Render featured tools
function renderFeaturedTools() {
    const container = document.getElementById('featuredTools');
    if (!container) return;
    
    const featured = toolsDatabase.filter(t => t.featured);
    
    container.innerHTML = featured.map(tool => `
        <div class="tool-card">
            <div class="tool-image" style="background: ${getGradient(tool.category)}">
                ${tool.icon}
            </div>
            <div class="tool-content">
                <span class="tool-badge">${tool.badge}</span>
                <h3>${tool.name}</h3>
                <div class="tool-rating">${'★'.repeat(Math.floor(tool.rating))}${'☆'.repeat(5-Math.floor(tool.rating))} ${tool.rating}/5</div>
                <p>${tool.description.substring(0, 100)}...</p>
                <p class="tool-price">${tool.price}</p>
                <a href="review-${tool.id}.html" class="btn">Read Review</a>
            </div>
        </div>
    `).join('');
}

// Render latest reviews
function renderLatestReviews() {
    const container = document.getElementById('latestReviews');
    if (!container) return;
    
    const latest = toolsDatabase.slice(0, 4);
    
    container.innerHTML = latest.map(tool => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-icon">${tool.icon}</span>
                <div class="review-meta">
                    <h3>${tool.name}</h3>
                    <span class="rating">${'★'.repeat(Math.floor(tool.rating))}${'☆'.repeat(5-Math.floor(tool.rating))} ${tool.rating}/5</span>
                </div>
            </div>
            <p class="review-excerpt">${tool.description}</p>
            <p class="tool-price">${tool.price}</p>
            <a href="review-${tool.id}.html" class="read-more">Read Full Review →</a>
        </div>
    `).join('');
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchTools();
        }
    });
}

function searchTools() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query.trim()) return;
    
    const results = toolsDatabase.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
    );
    
    if (results.length > 0) {
        // Redirect to first result
        window.location.href = `review-${results[0].id}.html`;
    } else {
        alert('No tools found matching "' + query + '". Try searching for "ChatGPT", "Midjourney", or "coding" tools.');
    }
}

// Get gradient for tool images
function getGradient(category) {
    const gradients = {
        writing: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        images: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        coding: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        productivity: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        video: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        design: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        voice: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    };
    return gradients[category] || gradients.writing;
}

// Newsletter subscription
function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // In production, send to your email service
    alert('Thanks for subscribing! We\'ll send AI tool updates to ' + email);
    e.target.reset();
}

// Track visits (for analytics)
function trackVisit() {
    const visitData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // Store in localStorage (in production, send to analytics)
    let visits = JSON.parse(localStorage.getItem('siteVisits') || '[]');
    visits.push(visitData);
    localStorage.setItem('siteVisits', JSON.stringify(visits.slice(-100))); // Keep last 100
    
    console.log('Visit tracked. Total visits:', visits.length);
}

// Export for use in other pages
window.toolsDatabase = toolsDatabase;
window.searchTools = searchTools;
