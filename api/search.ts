import { NowRequest, NowResponse } from "@vercel/node"
import Boom from '@hapi/boom'
import { getJson } from "../utils/fetch"
import { fuzzySearch } from "../utils/search"
import { searchQuery } from "../utils/validator"
import { ResponseData } from "../utils/response"
import { logger } from "../utils/logger"

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = searchQuery.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const url = req.query.url as string
    const q = req.query.q as string
    const formattedVtt = await getJson(`https://${req.headers.host}/api?url=${url}`)
    logger.info({ formattedVtt })

    const searchResult = fuzzySearch(formattedVtt, q)
    logger.info({ searchResult })

    return res.send(new ResponseData(searchResult).get())
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}