const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto('http://localhost:5173/terms', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 2000));
        const bodyContent = await page.evaluate(() => document.body.innerHTML);
        fs.writeFileSync('out.html', bodyContent);
        await browser.close();
        process.exit(0);
    } catch (e) {
        console.error("Test failed:", e);
        process.exit(1);
    }
})();
