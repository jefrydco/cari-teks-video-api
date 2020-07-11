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
    logger.info('FORMATTED_URL', formattedUrl)

    const timedTextUrl = await getTimedText(formattedUrl)
    logger.info('TIMED_TEXT_URL', timedTextUrl)

    const vtt = await getVTT(timedTextUrl)
    logger.info('VTT', vtt)

    const strippedVtt = stripHtml(vtt)
    logger.info('STRIPPED_VTT', strippedVtt)

    const formattedVtt = vttToJson(strippedVtt)
      .map(item => ({
        start: toSecond(item.start as number),
        end: toSecond(item.end as number),
        text: stripWhitespaceNewLine(item.text)
      }))
    logger.info('FORMATTED_VTT', formattedVtt)

    const page = parseInt(req.query.page as string)
    if (isExists(page)) {
      logger.info('HERE', page)
      const paginated = paginate(formattedVtt, page)
      return res.send(new ResponseData(paginated, { page }).get())
    }
    logger.info('THERE')

    return res.send(new ResponseData(formattedVtt).get())
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}