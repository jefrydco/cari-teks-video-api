import { NowRequest, NowResponse } from "@vercel/node"
import { getJson } from "../utils/fetch"
import fuzzySearch from "../utils/fuzy"

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const url = req.query.url as string || 'https://www.youtube.com/embed/3Fx5Q8xGU8k?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1'
    const q = req.query.q as string || ''
    // const formattedVtt = await getJson(`${req.headers.host}`)
    // const searchResult = fuzzySearch(formattedVtt, q)
    res.send({ searchResult: req.headers.host })
  } catch (error) {
    console.error(error)
    res.send(error)
  }
}