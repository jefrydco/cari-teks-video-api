require('es6-promise').polyfill()
require('isomorphic-fetch')

export default async function getVTT(url: string) {
  const res = await fetch(url).then(_ => _.text())
  return res
}
