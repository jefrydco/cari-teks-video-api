import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'

import {
  fetcherSearch,
  guardianSearch,
  retrieverSearch,
  generatorId,
  finder,
  paginator,
  removerId,
  highlighter,
  formatter,
  logger
} from '../modules'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = guardianSearch.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const { reqUrl, paginated, page, size, q, marked } = retrieverSearch(req)

    const { data, meta } = await fetcherSearch(reqUrl)

    if (!paginated) {
      return res.send({ data, meta })
    }

    const generatedIdData = generatorId(data)

    const foundData = await finder(generatedIdData, q)

    let highlightedData = foundData
    if (marked) {
      highlightedData = highlighter(foundData, q)
    }

    const paginatedData = paginator(highlightedData, page, size)

    const removedIdData = removerId(paginatedData)

    const formattedData = formatter(removedIdData, {
      page,
      reqUrl,
      dataLength: foundData.length,
      size,
      meta,
      paginated,
      q,
      marked,
      isSearch: true
    })

    return res.send(formattedData)
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}
