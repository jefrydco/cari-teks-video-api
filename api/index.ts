import { NowRequest, NowResponse } from '@vercel/node'
import getScreenshot from '../utils/browser'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const url = req.query.url as string || 'https://www.youtube.com/embed/3Fx5Q8xGU8k?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1'
    const file = await getScreenshot(url)
    res.setHeader("Content-Type", `image/png`);
    res.end(file);
  } catch (error) {
    res.send(error)
  }
}