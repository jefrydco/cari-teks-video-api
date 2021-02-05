import { VttWithMeta } from "./types"

require('es6-promise').polyfill()
require('isomorphic-fetch')

export async function getVTT(url: string) {
  const res = await fetch(url).then(_ => _.text())
  return res
}

export async function getJson(url: string): Promise<VttWithMeta> {
  const res = await fetch(url)
    .then(_ => _.json())
    .then(({ data, meta }) => ({ data, meta }))
  return res
}
