import joi from '@hapi/joi'

export const indexQuery = joi.object({
  url: joi.string().required(),
  page: joi.string().optional(),
  size: joi.string().optional(),
  paginated: joi.number().integer().allow(0, 1).optional()
})

export const searchQuery = indexQuery.keys({
  q: joi.string().min(3).required(),
  marked: joi.number().integer().allow(0, 1).optional()
})
