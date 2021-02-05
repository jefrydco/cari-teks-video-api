import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'
import { getTimedText } from '../utils/browser'
import { getVTT } from '../utils/fetch'
import { formatUrl } from '../utils/url'
import { vttToJson } from '../utils/vtt'
import { stripHtml, stripWhitespaceNewLine } from '../utils/string'
import { indexQuery } from '../utils/validator'
import { paginate, formatResponseData } from '../utils/response'
import { logger } from '../utils/logger'
import { toSecond } from '../utils/time'
import { DEFAULT_PAGINATION_SIZE } from '../constants'
import { boolean } from 'boolean'

import type { NodeCue } from 'subtitle'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = indexQuery.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const url = req.query.url as string
    const formattedUrl = formatUrl(url)
    // logger.info({ formattedUrl }, 'FORMATTED_URL')

    const { timedText, meta } = await getTimedText(formattedUrl)
    // logger.info({ timedTextUrl }, 'TIMED_TEXT_URL')

    const vtt = await getVTT(timedText)
    // logger.info({ vtt }, 'VTT')

    const strippedVtt = stripHtml(vtt)
    // logger.info({ strippedVtt }, 'STRIPPED_VTT')

    const formattedVtt = vttToJson(strippedVtt)
      .filter((item) => item.type === 'cue')
      .map(item => ({
        start: toSecond((item as NodeCue).data.start || 0),
        end: toSecond((item as NodeCue).data.end || 0),
        text: stripWhitespaceNewLine((item as NodeCue).data.text)
      }))

    const paginated = boolean(req.query.paginated as string || 1)
    if (!paginated) {
      return res.send({ data: formattedVtt })
    }
    // return res.send({ data: formattedVtt })
    // logger.info({ formattedVtt }, 'FORMATTED_VTT')

    const page = parseInt(req.query.page as string) || 1
    const reqUrl = `https://${req.headers.host}${req.url}`
    const pageSize = parseInt(req.query.size as string) || DEFAULT_PAGINATION_SIZE
    const paginatedFormattedVtt = paginate(formattedVtt, page, pageSize)
    // logger.info({ paginatedFormattedVtt }, 'PAGINATED')

    return res.send(formatResponseData(paginatedFormattedVtt, {
      page,
      url: reqUrl,
      dataLength: formattedVtt.length,
      size: pageSize,
      meta
    }))
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}