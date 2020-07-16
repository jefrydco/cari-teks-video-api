import { Vtt } from "./types"

export function generateId(list: Vtt[]) {
  return list.map((item, id) => ({ id, ...item }))
}

export function removeId(list: Vtt[]) {
  return list.map(item => {
    delete item.id
    return item
  })
}
