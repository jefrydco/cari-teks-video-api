export type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

export type VideoMeta = {
  title: string
  channelName: string
  channelUrl: string
  channelLogoUrl: string
}

export enum PaginationUrlType {
  First,
  Last,
  Prev,
  Next
}

export type FormatterOptions = {
  reqUrl?: string
  page?: number
  size?: number
  dataLength?: number
  meta: VideoMeta
}

export type VttWithMetaPagination = VttWithMeta & {
  first: string
  last: string
  prev: string
  next: string
  total: number
  page: number
}

export type VttWithMeta = {
  data: Vtt[]
  meta: VideoMeta
}

export type RetrieverIndexReturnType = {
  reqUrl: string
  youtubeUrl: string
  paginated: boolean
  page: number
  size: number
}

export type RetrieverSearchReturnType = RetrieverIndexReturnType & {
  q: string
  marked: boolean
}

export type YoutubeCCReturnType = {
  ccUrl: string
  meta: VideoMeta
}

export type FetcherReturnType = {
  data: Vtt[]
  meta: VideoMeta
}

export type FormatterReturnType = VttWithMeta | VttWithMetaPagination
