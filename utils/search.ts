import Fuse from 'fuse.js'

export function fuzzySearch(list: Array<Record<string, any>>, q: string, marked: boolean = true) {
  const fuse = new Fuse(list, {
    keys: ['text'],
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.3
  })
  if (marked) {
    return markText(fuse.search(q))
  }
  return fuse.search(q)
}

// Taken from: https://github.com/krisk/Fuse/issues/6#issuecomment-455813098
function markText(fuseSearchResult: Array<Fuse.FuseResult<Record<string, any>>>, highlightClassName: string = 'ctv-marked') {
  function set(obj: object, path: string, value: any) {
      const pathValue = path.split('.')
      let i: number

      for (i = 0; i < pathValue.length - 1; i++) {
        obj = obj[pathValue[i]]
      }

      obj[pathValue[i]] = value
  }

  function generateHighlightedText(inputText: string, regions: number[] = []) {
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
    .filter(({ matches }: any) => matches && matches.length)
    .map(({ item, matches }: any) => {
      const highlightedItem = { ...item }

      matches.forEach((match: any) => {
        set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices))
      })

      return highlightedItem
    })
}