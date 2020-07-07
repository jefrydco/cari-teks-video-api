import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

export default async function getScreenshot(url: string) {
  const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
  })

  const page = await browser.newPage()
  await page.setRequestInterception(true)

  page.on('request', request => {
    console.log(request.url())
    request.continue()
  })

  await page.goto(url, {
    waitUntil: 'networkidle0'
  })

  await page.evaluate(() => {
    const el = document.querySelector('#player') as HTMLDivElement
    const playButton = el.querySelector('.ytp-large-play-button') as HTMLButtonElement
    playButton.click()
  })

  await page.evaluate(() => {
    const el = document.querySelector('#player') as HTMLDivElement
    const captionButton = el.querySelector('.ytp-subtitles-button') as HTMLButtonElement
    captionButton.click()
  })

  const file = await page.screenshot({
    type: 'png'
  })

  await browser.close()
  return file
}
