export enum PaginationUrlType {
  First,
  Last,
  Prev,
  Next
}

export type ResponseData = {
  data: Vtt[]
}

export type ResponseDataWithPagination = ResponseData & {
  first: string
  last: string
  prev: string
  next: string
  total: number
}

export type ResponseDataFormatterOptions = {
  url?: string
  page?: number
  size?: number
  dataLength?: number
}

export type ResponseDataType = ResponseData | ResponseDataWithPagination

export type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}
