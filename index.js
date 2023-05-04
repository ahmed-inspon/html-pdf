const puppeteer = require('puppeteer');
const fs = require('fs');
const website_url = 'https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/';

const init = async() => {
    // Create a browser instance
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout:10000
    });
    // Create a new page
    const page = await browser.newPage();
    await page.goto(website_url, { waitUntil: 'networkidle0' });
    const html = fs.readFileSync('packaging_slip.html', 'utf-8');
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('screen');

    // Downlaod the PDF
    const pdf = await page.pdf({
        path: 'result.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });

    // Close the browser instance
    await browser.close();
}
// Open URL in current page
init();