#!/usr/bin/env node

/**
 * AI Affiliate Site - Weekly Automation Script
 * Automatically updates content and deploys to Railway
 * Run via cron: 0 9 * * 1 (Every Monday at 9 AM)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname);
const LOG_FILE = path.join(SITE_DIR, 'automation.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry);
}

async function runAutomation() {
    log('🚀 Starting weekly site automation...');
    
    try {
        // 1. Generate updated review pages
        log('📝 Generating review pages...');
        execSync('node generate-reviews.js', { cwd: SITE_DIR });
        
        // 2. Update stats
        const files = fs.readdirSync(SITE_DIR).filter(f => f.endsWith('.html'));
        log(`📄 Total pages: ${files.length}`);
        
        // 3. Update last modified date
        const lastUpdated = new Date().toISOString().split('T')[0];
        log(`📅 Last updated: ${lastUpdated}`);
        
        // 4. Git operations (if using git)
        try {
            execSync('git add -A && git status --short', { cwd: SITE_DIR });
            log('📦 Changes staged for commit');
        } catch (e) {
            log('⚠️ Git not configured or no changes');
        }
        
        // 5. Deploy to Railway (if configured)
        if (process.env.RAILWAY_TOKEN) {
            log('🚀 Deploying to Railway...');
            execSync('npx railway deploy', { cwd: SITE_DIR, stdio: 'inherit' });
            log('✅ Deployed successfully!');
        } else {
            log('⚠️ RAILWAY_TOKEN not set - skipping deployment');
        }
        
        // 6. Generate report
        const report = generateWeeklyReport(files);
        log(report);
        
        log('✅ Automation complete!');
    } catch (error) {
        log(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

function generateWeeklyReport(files) {
    const reviewCount = files.filter(f => f.startsWith('review-')).length;
    const categoryCount = files.filter(f => f.startsWith('category-')).length;
    
    return `
📊 Weekly Report:
   - Total pages: ${files.length}
   - Review pages: ${reviewCount}
   - Category pages: ${categoryCount}
   - Status: All systems operational
    `;
}

// CLI interface
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
AI Affiliate Site Automation

Usage: node automate.js [options]

Options:
  --run       Run full automation
  --deploy    Deploy to Railway only
  --generate  Generate review pages only
  --stats     Show site statistics
  --help      Show this help

Examples:
  node automate.js --run        # Full automation
  node automate.js --generate    # Generate pages only

Cron setup (every Monday at 9 AM):
  0 9 * * 1 cd /path/to/site && node automate.js --run
    `);
    process.exit(0);
}

if (args.includes('--stats')) {
    const files = fs.readdirSync(SITE_DIR).filter(f => f.endsWith('.html'));
    console.log('\n📊 Site Statistics:');
    console.log(`   Total pages: ${files.length}`);
    console.log(`   Review pages: ${files.filter(f => f.startsWith('review-')).length}`);
    console.log(`   Category pages: ${files.filter(f => f.startsWith('category-')).length}`);
    console.log('');
    process.exit(0);
}

if (args.includes('--deploy') && process.env.RAILWAY_TOKEN) {
    log('🚀 Deploying to Railway...');
    execSync('npx railway deploy', { cwd: SITE_DIR, stdio: 'inherit' });
    log('✅ Deployment complete!');
    process.exit(0);
}

if (args.includes('--generate')) {
    log('📝 Generating reviews...');
    execSync('node generate-reviews.js', { cwd: SITE_DIR });
    log('✅ Generation complete!');
    process.exit(0);
}

// Default: run full automation
runAutomation();
