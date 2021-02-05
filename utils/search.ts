import Flexsearch from 'flexsearch'
import { Vtt } from './types'

export async function flexSearch(
  list: Vtt[],
  q: string,
  marked: boolean = true
) {
  const index = Flexsearch.create<Record<string, any>>({
    doc: {
      id: 'id',
      field: ['text']
    }
  })
  index.add(list)
  const result = await index.search(q)
  if (marked) {
    return markText(result as Vtt[], q)
  }
  return result as Vtt[]
}

function replacer(match: string) {
  return `<mark class="cvt-highlight">${match}</mark>`
}

function markText(list: Vtt[], q: string) {
  return list.map((item) => ({
    ...item,
    text: `${item.text}`.includes(q)
      ? `${item.text}`.replace(new RegExp(`${q}`, 'gi'), replacer)
      : `${item.text}`.replace(
          new RegExp(`${q.match(/\S+/g).join('|')}`, 'gi'),
          replacer
        )
  }))
}
