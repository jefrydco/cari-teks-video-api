import stripHTML from 'string-strip-html'

export function stripHtml(string: string) {
  return stripHTML(string)
    .replace(/(<([^>]+)>)/ig, '')
}

export function stripWhitespaceNewLine(string: string) {
  return string
    .replace(/ {1,}/g, ' ')
    .replace(/(?:\r\n|\r|\n)/g, ' ')
    .trim()
}