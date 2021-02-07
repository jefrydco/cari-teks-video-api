import { Vtt } from '../types'

export function removerId(list: Vtt[]) {
  return list.map((item) => {
    delete item.id
    return item
  })
}
