import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import getUrls from 'get-urls'

import type { NodeCue } from 'subtitle'

import { FetcherReturnType, Vtt, YoutubeCCReturnType } from '../types'
import { stripHtml, stripWhitespaceNewLine } from '../utils/string'
import { vttToJson } from '../utils/vtt'
import { toSecond } from '../utils/time'

require('isomorphic-fetch')

async function getYoutubeCC(url: string): Promise<YoutubeCCReturnType> {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  })

  const page = await browser.newPage()
  await page.setRequestInterception(true)

  let ccUrl: string = ''

  page.on('request', (request) => {
    if (request.resourceType() === 'xhr') {
      const _timedTextUrl = request.url()
      if (_timedTextUrl.includes('https://www.youtube.com/api/timedtext')) {
        ccUrl = _timedTextUrl.replace('json3', 'vtt')
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
    '.ytp-title-expanded-title',
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
    ccUrl,
    meta: {
      title,
      channelName,
      ...channelLogoAndUrl
    }
  }
}

export async function fetcherIndex(url: string): Promise<FetcherReturnType> {
  const { ccUrl, meta } = await getYoutubeCC(url)
  const data: Vtt[] = await fetch(ccUrl)
    .then((_) => (_.ok ? _.text() : ''))
    .then((_) =>
      vttToJson(stripHtml(_))
        .filter((item) => item.type === 'cue')
        .map((item) => ({
          start: toSecond((item as NodeCue).data.start || 0),
          end: toSecond((item as NodeCue).data.end || 0),
          text: stripWhitespaceNewLine((item as NodeCue).data.text)
        }))
    )

  return {
    data,
    meta
  }
}

export async function fetcherSearch(url: string): Promise<FetcherReturnType> {
  return fetch(url).then((_) =>
    _.ok
      ? _.json()
      : {
          data: [],
          meta: {
            title: '',
            channelName: '',
            channelUrl: '',
            channelLogoUrl: ''
          }
        }
  )
}
