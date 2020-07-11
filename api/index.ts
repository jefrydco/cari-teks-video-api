import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'
import { getTimedText } from '../utils/browser'
import { getVTT } from '../utils/fetch'
import { formatUrl } from '../utils/url'
import { vttToJson } from '../utils/vtt'
import { stripHtml, stripWhitespaceNewLine } from '../utils/string'
import { indexQuery } from '../utils/validator'
import { ResponseData, paginate } from '../utils/response'
import { logger } from '../utils/logger'
import { toSecond } from '../utils/time'
import { isExists } from '../utils/commons'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = indexQuery.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const url = req.query.url as string
    const formattedUrl = formatUrl(url)
    logger.info({ formattedUrl })

    const timedTextUrl = await getTimedText(formattedUrl)
    logger.info({ timedTextUrl })

    const vtt = await getVTT(timedTextUrl)
    logger.info({ vtt })

    const strippedVtt = stripHtml(vtt)
    logger.info({ strippedVtt })

    const formattedVtt = vttToJson(strippedVtt)
      .map(item => ({
        start: toSecond(item.start as number),
        end: toSecond(item.end as number),
        text: stripWhitespaceNewLine(item.text)
      }))
    logger.info({ formattedVtt })

    const page = parseInt(req.query.page as string)
    if (isExists(page)) {
      const paginated = paginate(formattedVtt, page)
      return res.send(new ResponseData(paginated, { page }))
    }

    return res.send(new ResponseData(formattedVtt))
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}