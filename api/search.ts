import { NowRequest, NowResponse } from "@vercel/node"
import Boom from '@hapi/boom'
import { getJson } from "../utils/fetch"
import { fuzzySearch } from "../utils/search"
import { searchQuery } from "../utils/validator"
import { formatResponseData, paginate } from "../utils/response"
import { logger } from "../utils/logger"
import { isExists } from "../utils/commons"
import { DEFAULT_PAGINATION_SIZE } from "../constants"

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = searchQuery.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const url = req.query.url as string
    const q = req.query.q as string
    const formattedVtt = await getJson(`https://${req.headers.host}/api?url=${url}`)
    // logger.info({ formattedVtt }, 'FORMATTED_VTT')

    const marked = req.query.marked as string
    // return res.send(marked)
    // logger.info({ marked }, 'MARKED')
    const searchResult = fuzzySearch(formattedVtt, q, Boolean(marked))
    // logger.info({ searchResult }, 'SEARCH_RESULT')

    let page = parseInt(req.query.page as string) || 1
    let reqUrl = `https://${req.headers.host}${req.url}?page=${page}`
    let pageSize = parseInt(req.query.size as string) || DEFAULT_PAGINATION_SIZE

    if (isExists(req.query.page as string)) {
      reqUrl = `https://${req.headers.host}${req.url}`
    }

    let paginated = paginate(searchResult, page, pageSize)
    // logger.info({ paginated }, 'PAGINATED')

    return res.send(formatResponseData(paginated, {
      page,
      url: reqUrl,
      dataLength: searchResult.length,
      size: pageSize
    }))
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}