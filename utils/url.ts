import queryString from 'query-string'
import normalizeUrl from 'normalize-url'

export function formatUrl(url: string) {
  // Taken from: https://stackoverflow.com/a/6904504
  const [_, id] = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
    .exec(url)
  return `https://www.youtube.com/embed/${id}?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1`
}

export function getIndexUrl(host: string, url: string) {
  return normalizeUrl(`${host}/api?${
    queryString.stringify({ url })
  }`, {
    forceHttps: true
  })
}