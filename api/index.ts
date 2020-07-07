import { NowRequest, NowResponse } from '@vercel/node'
import getTimedText from '../utils/browser'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const url = req.query.url as string || 'https://www.youtube.com/embed/3Fx5Q8xGU8k?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1'
    const timedTextUrl = await getTimedText(url)
    res.send({ timedTextUrl })
  } catch (error) {
    console.error(error)
    res.send(error)
  }
}