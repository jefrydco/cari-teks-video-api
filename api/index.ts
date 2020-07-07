import { NowRequest, NowResponse } from '@vercel/node'
import getScreenshot from '../utils/browser'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const file = await getScreenshot('https://jefrydco.id')
    res.setHeader("Content-Type", `image/png`);
    res.end(file);
  } catch (error) {
    res.send(error)
  }
}