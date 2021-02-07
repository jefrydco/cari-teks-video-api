import { Vtt } from '../types'

function replacer(match: string) {
  return `<mark class="cvt-highlight">${match}</mark>`
}

export function highlighter(list: Vtt[], q: string) {
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
