import { NowRequest, NowResponse } from "@vercel/node"
import { getJson } from "../utils/fetch"
import fuzzySearch from "../utils/fuzy"
import { searchQuery } from "../utils/validator"

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    searchQuery.validateAsync(req.query)
  } catch (error) {
    res.send(error)
  }
  try {
    const url = req.query.url as string
    const q = req.query.q as string
    const formattedVtt = await getJson(`https://${req.headers.host}/api?url=${url}`)
    const searchResult = fuzzySearch(formattedVtt, q)
    res.send({ searchResult })
  } catch (error) {
    console.error(error)
    res.send(error)
  }
}