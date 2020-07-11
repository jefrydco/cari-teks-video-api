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
import { isExists } from '../utils/commons'
import { DEFAULT_PAGINATION_SIZE } from '../constants'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = indexQuery.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const url = req.query.url as string
    const formattedUrl = formatUrl(url)
    // logger.info({ formattedUrl }, 'FORMATTED_URL')

    const timedTextUrl = await getTimedText(formattedUrl)
    // logger.info({ timedTextUrl }, 'TIMED_TEXT_URL')

    const vtt = await getVTT(timedTextUrl)
    // logger.info({ vtt }, 'VTT')

    const strippedVtt = stripHtml(vtt)
    // logger.info({ strippedVtt }, 'STRIPPED_VTT')

    const formattedVtt = vttToJson(strippedVtt)
      .map(item => ({
        start: toSecond(item.start as number),
        end: toSecond(item.end as number),
        text: stripWhitespaceNewLine(item.text)
      }))
    logger.info({ length: formattedVtt.length })
    logger.info({ divided: formattedVtt.length / DEFAULT_PAGINATION_SIZE })
    // logger.info({ formattedVtt }, 'FORMATTED_VTT')

    let page = parseInt(req.query.page as string) || 1
    let reqUrl = `https://${req.headers.host}${req.url}?page=${page}`
    let pageSize = parseInt(req.query.size as string) || DEFAULT_PAGINATION_SIZE

    if (isExists(req.query.page as string)) {
      reqUrl = `https://${req.headers.host}${req.url}`
    }

    const paginated = paginate(formattedVtt, page, pageSize)
    logger.info({ paginated }, 'PAGINATED')

    return res.send(formatResponseData(paginated, {
      page,
      url: reqUrl,
      dataLength: formattedVtt.length,
      size: pageSize
    }))
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}