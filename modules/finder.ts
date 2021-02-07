import Flexsearch from 'flexsearch'
import { Vtt } from '../types'

export async function finder(list: Vtt[], q: string) {
  const index = Flexsearch.create<Vtt>({
    doc: {
      id: 'id',
      field: ['text']
    }
  })
  list.forEach((item) => {
    index.add(item)
  })
  return index.search(q)
}
