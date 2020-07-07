import stripHtml from 'string-strip-html'

export default function sanitizeString(string: string) {
  return stripHtml(string).replace(/(<([^>]+)>)/ig, '')
}