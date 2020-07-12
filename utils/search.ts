import Fuse from 'fuse.js'

export function fuzzySearch(list: Array<Record<string, any>>, q: string, marked: boolean = true) {
  const fuse = new Fuse(list, {
    keys: ['text'],
    includeMatches: marked,
    minMatchCharLength: 3,
    ignoreLocation: true
  })
  if (marked) {
    return markText(fuse.search(q))
  }
  return fuse.search(q)
    .map(({ item }) => item)
}

// Taken from: https://github.com/krisk/Fuse/issues/6#issuecomment-455813098
function markText(fuseSearchResult: Array<Fuse.FuseResult<Record<string, any>>>, highlightClassName: string = 'ctv-marked') {
  function set(obj: Record<string, any>, path: string, value: string) {
      const pathValue = path.split('.')
      let i: number

      for (i = 0; i < pathValue.length - 1; i++) {
        obj = obj[pathValue[i]]
      }

      obj[pathValue[i]] = value
  }

  function generateHighlightedText(inputText: string, regions: readonly Fuse.RangeTuple[] = []) {
    let content = ''
    let nextUnhighlightedRegionStartingIndex = 0

    regions.forEach(region => {
      const lastRegionNextIndex = region[1] + 1

      content += [
        inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        `<mark class="${highlightClassName}">`,
        inputText.substring(region[0], lastRegionNextIndex),
        '</mark>',
      ].join('')

      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex
    })

    content += inputText.substring(nextUnhighlightedRegionStartingIndex)

    return content
  }

  return fuseSearchResult
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const highlightedItem = { ...item }

      matches.forEach((match) => {
        set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices))
      })

      return highlightedItem
    })
}