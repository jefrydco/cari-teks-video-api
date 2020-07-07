import { parse } from 'subtitle'

export default function vttToJson(vtt: string) {
  return parse(vtt)
}