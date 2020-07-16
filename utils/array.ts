export function generateId(list: Array<Record<string, any>>) {
  return list.map((item, id) => ({ id, ...item }))
}