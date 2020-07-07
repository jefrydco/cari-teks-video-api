import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

export default async function getTimedText(url: string) {
  const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
  })

  const page = await browser.newPage()
  await page.setRequestInterception(true)

  let timedTextUrl: string;

  page.on('request', request => {
    if (request.resourceType() === 'xhr') {
      const _timedTextUrl = request.url()
      if (_timedTextUrl.includes('https://www.youtube.com/api/timedtext')) {
        timedTextUrl = _timedTextUrl.replace('json3', 'vtt')
      }
    }
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

  await browser.close()
  return timedTextUrl
}
