import { NowRequest } from '@vercel/node'
import { boolean } from 'boolean'
import normalizeUrl from 'normalize-url'
import { stringifyUrl } from 'query-string'

import { DEFAULT_PAGINATION_SIZE } from '../constants'
import { RetrieverIndexReturnType, RetrieverSearchReturnType } from '../types'
import { getYoutubeEmbedUrl } from '../utils/url'

export function retrieverIndex(req: NowRequest): RetrieverIndexReturnType {
  const reqUrl = normalizeUrl(`${req.headers.host}${req.url}`, {
    forceHttps: true
  })
  const youtubeUrl = getYoutubeEmbedUrl(req.query.url as string)
  const paginated = boolean((req.query.paginated as string) || 1)
  const page = parseInt(req.query.page as string) || 1
  const size = parseInt(req.query.size as string) || DEFAULT_PAGINATION_SIZE

  return {
    reqUrl,
    youtubeUrl,
    paginated,
    page,
    size
  }
}

export function retrieverSearch(req: NowRequest): RetrieverSearchReturnType {
  const index = retrieverIndex(req)
  const q = req.query.q as string
  const marked = boolean((req.query.marked as string) || 1)
  const reqUrl = normalizeUrl(
    stringifyUrl({
      url: req.headers.host,
      query: {
        url: req.query.url as string,
        paginated: 0
      }
    }),
    { forceHttps: true }
  )

  return {
    ...index,
    reqUrl,
    q,
    marked
  }
}
