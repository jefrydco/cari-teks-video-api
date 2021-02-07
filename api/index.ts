import { NowRequest, NowResponse } from '@vercel/node'
import Boom from '@hapi/boom'

import {
  guardianIndex,
  retrieverIndex,
  fetcherIndex,
  paginator,
  formatter,
  logger
} from '../modules'

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { error } = guardianIndex.validate(req.query)
    if (error) {
      return res.send(Boom.badRequest(error.message, error))
    }

    const { reqUrl, youtubeUrl, paginated, page, size } = retrieverIndex(req)

    const { data, meta } = await fetcherIndex(youtubeUrl)

    if (!paginated) {
      return res.send({ data, meta })
    }

    const paginatedData = paginator(data, page, size)

    const formattedData = formatter(paginatedData, {
      page,
      reqUrl,
      dataLength: data.length,
      size,
      meta
    })

    return res.send(formattedData)
  } catch (error) {
    logger.error(error)
    return res.send(Boom.internal())
  }
}
