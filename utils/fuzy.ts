import Fuse from 'fuse.js'

export default function fuzzySearch(list: Array<Record<string, any>>, q: string) {
  const fuse = new Fuse(list, {
    keys: ['text'],
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.3
  })
  return fuse.search(q)
}