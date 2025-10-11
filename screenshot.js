import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to match common desktop size
    await page.setViewport({ width: 1440, height: 900 });
    
    // Navigate to local dev server
    await page.goto('http://localhost:5173', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait a bit more for any animations or async loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot
    const screenshotPath = join(__dirname, 'current-implementation.png');
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: false 
    });
    
    console.log(`Screenshot saved to: ${screenshotPath}`);
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshot();