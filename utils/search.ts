import Flexsearch from 'flexsearch'
import { Vtt } from './types'

export async function flexSearch(list: Vtt[], q: string, marked: boolean = true, markedClass?: string) {
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
    return markTextForFlex(result as Vtt[], q, markedClass)
  }
  return result as Vtt[]
}

function markTextForFlex(list: Vtt[], q: string, markedClass?: string) {
  const regex = new RegExp(`${q}`, 'gi')
  return list.map(item => ({
    ...item,
    text: `${item.text}`
      .replace(
        regex,
        match => `<mark${markedClass ? ` class="${markedClass.split(',').join(' ')}"` : ''}>${match}</mark$>`
      )
  }))
}