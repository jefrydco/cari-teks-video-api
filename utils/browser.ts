import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import getUrls from 'get-urls'

import { TimedTextReturns } from './types'

export async function getTimedText(url: string): Promise<TimedTextReturns> {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  })

  const page = await browser.newPage()
  await page.setRequestInterception(true)

  let timedTextUrl: string = ''

  page.on('request', (request) => {
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

  const title: string = await page.$$eval('.ytp-title-link', (elements) =>
    elements.length > 0 ? (elements[0] as HTMLAnchorElement).innerText : ''
  )
  const channelName: string = await page.$$eval(
    '.iv-branding-context-name',
    (elements) =>
      elements.length > 0 ? (elements[0] as HTMLDivElement).innerText : ''
  )
  const channelLogoAndUrl = await page.$$eval(
    '.ytp-title-channel-logo',
    (elements) => {
      if (elements.length > 0) {
        return {
          channelUrl: (elements[0] as HTMLAnchorElement).href,
          channelLogoUrl: (elements[0] as HTMLAnchorElement).style
            .backgroundImage
        }
      }
      return {
        channelUrl: '',
        channelLogoUrl: ''
      }
    }
  )

  const _channelLogoUrl = Array.from(getUrls(channelLogoAndUrl.channelLogoUrl))
  channelLogoAndUrl.channelLogoUrl =
    _channelLogoUrl.length > 0 ? _channelLogoUrl[0] : ''

  await browser.close()

  return {
    timedText: timedTextUrl,
    meta: {
      title,
      channelName,
      ...channelLogoAndUrl
    }
  }
}
