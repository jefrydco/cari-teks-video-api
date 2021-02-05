import { VttWithMeta } from './types'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export async function getVTT(url: string) {
  const res = await fetch(url).then((_) => (_.ok ? _.text() : ''))
  return res
}

export async function getJson(url: string): Promise<VttWithMeta> {
  const res = await fetch(url)
    .then((_) =>
      _.ok
        ? _.json()
        : {
            data: [],
            meta: {
              title: '',
              channelName: '',
              channelUrl: '',
              channelLogoUrl: ''
            }
          }
    )
    .then(({ data, meta }) => ({ data, meta }))
  return res
}
