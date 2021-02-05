import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'
import { boolean } from 'boolean'
import { formatResponseData, paginate } from '../utils/response'
import { logger } from '../utils/logger'
import { searchQuery } from '../utils/validator'
import { getJson } from '../utils/fetch'
import { getIndexUrl } from '../utils/url'
import { generateId, removeId } from '../utils/array'
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
    const marked = boolean((req.query.marked as string) || 1)
    const page = parseInt(req.query.page as string) || 1
    const reqUrl = `https://${req.headers.host}${req.url}`
    const pageSize =
      parseInt(req.query.size as string) || DEFAULT_PAGINATION_SIZE
    const paginated = boolean((req.query.paginated as string) || 1)

    const { data: formattedVtt, meta } = await getJson(
      getIndexUrl(req.headers.host, url)
    )
    logger.info(meta)
    const formattedVttWithId = generateId(formattedVtt)
    const searchResult = await flexSearch(formattedVttWithId, q, marked)
    if (!paginated) {
      return res.send({ data: searchResult })
    }

    const paginatedSearchResult = paginate(searchResult, page, pageSize)
    const removedId = removeId(paginatedSearchResult)

    return res.send(
      formatResponseData(removedId, {
        page,
        url: reqUrl,
        dataLength: searchResult.length,
        size: pageSize,
        meta
      })
    )
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}
