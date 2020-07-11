import joi from '@hapi/joi'

export const indexQuery = joi.object({
  url: joi.string().required()
})

export const searchQuery = indexQuery.keys({
  q: joi.string().min(3).required()
})
