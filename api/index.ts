import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'
import { getTimedText } from '../utils/browser'
import { getVTT } from '../utils/fetch'
import { formatUrl } from '../utils/url'
import { vttToJson } from '../utils/vtt'
import { stripHtml, stripWhitespaceNewLine } from '../utils/string'
import { indexQuery } from '../utils/validator'
import { ResponseData } from '../utils/response'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = indexQuery.validate(req.query)
    if (error) {
      res.json(error)
    }

    const url = req.query.url as string
    const formattedUrl = formatUrl(url)
    const timedTextUrl = await getTimedText(formattedUrl)
    const vtt = await getVTT(timedTextUrl)
    const strippedVtt = stripHtml(vtt)
    const formattedVtt = vttToJson(strippedVtt)
      .map(item => ({
        ...item,
        text: stripWhitespaceNewLine(item.text)
      }))
    res.json(new ResponseData(formattedVtt))
  } catch (error) {
    console.log(error)
    res.json(Boom.internal())
  }
}