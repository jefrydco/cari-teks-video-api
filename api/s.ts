import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'
import { boolean } from 'boolean'
import { formatResponseData } from '../utils/response'
import { logger } from '../utils/logger'
import { searchQuery } from '../utils/validator'
import { getJson } from '../utils/fetch'
import { getIndexUrl } from '../utils/url'
import { generateId } from '../utils/array'
import { flexSearch } from '../utils/search'
import { DEFAULT_PAGINATION_SIZE } from '../constants'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = searchQuery.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const url = req.query.url as string
    const q = req.query.q as string
    const marked = boolean(req.query.marked as string || 1)
    const page = parseInt(req.query.page as string) || 1
    const reqUrl = `https://${req.headers.host}${req.url}`
    const pageSize = parseInt(req.query.size as string) || DEFAULT_PAGINATION_SIZE

    const formattedVtt = await getJson(getIndexUrl(req.headers.host, url))
    const formattedVttWithId = generateId(formattedVtt)
    const searchResult = await flexSearch(formattedVttWithId, q)

    return res.send(formatResponseData(searchResult))
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}