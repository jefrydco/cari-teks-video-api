import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

export default async function getScreenshot(url: string, type: 'png' | 'jpeg' = 'png', quality?: number, fullPage?: boolean) {
  const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.goto(url);
  const file = await page.screenshot({ type,  quality, fullPage });
  await browser.close();
  return file;
}
