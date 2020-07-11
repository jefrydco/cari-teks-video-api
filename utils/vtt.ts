import { parse } from 'subtitle'

export function vttToJson(vtt: string) {
  return parse(vtt)
}