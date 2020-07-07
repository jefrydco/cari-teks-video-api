import stripHtml from 'string-strip-html'

export default function sanitizeString(string: string) {
  return stripHtml(string)
    .replace(/(<([^>]+)>)/ig, '')
    .replace(/ {1,}/g, ' ')
    .replace(/(?:\r\n|\r|\n)/g, '')
}