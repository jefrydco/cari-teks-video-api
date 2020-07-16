import { Vtt } from "./types"

require('es6-promise').polyfill()
require('isomorphic-fetch')

export async function getVTT(url: string) {
  const res = await fetch(url).then(_ => _.text())
  return res
}

export async function getJson(url: string): Promise<Vtt[]> {
  const res = await fetch(url)
    .then(_ => _.json())
    .then(({ data }) => data)
  return res
}
