import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'
import { getTimedText } from '../utils/browser'
import { getVTT } from '../utils/fetch'
import { formatUrl } from '../utils/url'
import { vttToJson } from '../utils/vtt'
import { stripHtml, stripWhitespaceNewLine } from '../utils/string'
import { indexQuery } from '../utils/validator'
import { ResponseData } from '../utils/response'
import { logger } from '../utils/logger'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = indexQuery.validate(req.query)
    if (error) {
      return res.send(error)
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
        ...item,
        text: stripWhitespaceNewLine(item.text)
      }))
    logger.info({ formattedVtt })

    return res.send(new ResponseData(formattedVtt))
  } catch (error) {
    console.log(error)
    res.send(Boom.internal())
  }
}