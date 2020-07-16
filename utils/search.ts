import Fuse from 'fuse.js'
import Flexsearch from 'flexsearch'

export function fuzzySearch(list: Array<Record<string, any>>, q: string, marked: boolean = true) {
  const fuse = new Fuse(list, {
    keys: ['text'],
    includeMatches: marked,
    minMatchCharLength: 3,
    threshold: 0.7
  })
  if (marked) {
    return markTextForFuzzy(fuse.search(q))
  }
  return fuse.search(q)
    .map(({ item }) => item)
}

// Taken from: https://github.com/krisk/Fuse/issues/6#issuecomment-455813098
function markTextForFuzzy(fuseSearchResult: Array<Fuse.FuseResult<Record<string, any>>>, highlightClassName: string = 'ctv-marked') {
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

export async function flexSearch(list: Array<Record<string, any>>, q: string, marked: boolean = true) {
  const index = Flexsearch.create<Record<string, any>>({
    doc: {
      id: 'id',
      field: [
        'text'
      ] 
    }
  })
  index.add(list)
  const result = await index.search(q)
  if (marked) {
    return markTextForFlex(result, q)
  }
  return result
}

function markTextForFlex(list: Array<Record<string, any>>, q: string) {
  const regex = new RegExp(`${q}`, 'gi')
  return list.map(item => ({
    ...list,
    text: `${item.text}`
      .replace(
        regex,
        match => `<mark class="cvt-highlight">${match}</mark>`
      )
  }))
}