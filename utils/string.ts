import { stripHtml as strip } from 'string-strip-html'

export function stripHtml(string: string) {
  let { result } = strip(string)
  result = result.replace(/(<([^>]+)>)/ig, '')
  return result
}

export function stripWhitespaceNewLine(string: string) {
  return string
    .replace(/ {1,}/g, ' ')
    .replace(/(?:\r\n|\r|\n)/g, ' ')
    .trim()
}