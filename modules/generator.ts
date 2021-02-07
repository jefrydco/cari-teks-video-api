import { Vtt } from '../types'

export function generatorId(list: Vtt[]) {
  return list.map((item, id) => ({ id, ...item }))
}
