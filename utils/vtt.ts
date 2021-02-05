import { parseSync } from 'subtitle'

export function vttToJson(vtt: string) {
  return parseSync(vtt)
}
