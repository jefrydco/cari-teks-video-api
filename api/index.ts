import { NowRequest, NowResponse } from '@vercel/node'
import getTimedText from '../utils/browser'
import getVTT from '../utils/fetch'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const url = req.query.yt as string || 'https://www.youtube.com/embed/3Fx5Q8xGU8k?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1'
    // const timedTextUrl = await getTimedText(url)
    // const vtt = await getVTT(timedTextUrl)
    res.send({ query: req.query })
  } catch (error) {
    console.error(error)
    res.send(error)
  }
}