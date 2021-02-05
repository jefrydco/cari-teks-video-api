import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import { TimedTextReturns } from './types'

export async function getTimedText(url: string): Promise<TimedTextReturns> {
  const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
  })

  const page = await browser.newPage()
  await page.setRequestInterception(true)

  let timedTextUrl: string = '';
  let title: string = '';
  let channelName: string = '';
  let channelUrl: string = '';

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
    const titleEl = el.querySelector('.ytp-title-link') as HTMLAnchorElement
    const channelNameEl = el.querySelector('.iv-branding-context-name') as HTMLDivElement
    const channelUrlEl = el.querySelector('.ytp-title-channel-logo') as HTMLAnchorElement
    
    title = titleEl.innerText
    channelName = channelNameEl.innerText
    channelUrl = channelUrlEl.href
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

  return {
    timedText: timedTextUrl,
    meta: {
      title,
      channelName,
      channelUrl
    }
  }
}
