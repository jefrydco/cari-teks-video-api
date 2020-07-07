import { NowRequest, NowResponse } from '@vercel/node'
import getTimedText from '../utils/browser'
import getVTT from '../utils/fetch'
import formatUrl from '../utils/url'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const url = req.query.url as string || 'https://www.youtube.com/embed/3Fx5Q8xGU8k?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1'
    const formattedUrl = formatUrl(url)
    const timedTextUrl = await getTimedText(formattedUrl)
    const vtt = await getVTT(timedTextUrl)
    res.send({ vtt })
  } catch (error) {
    console.error(error)
    res.send(error)
  }
}