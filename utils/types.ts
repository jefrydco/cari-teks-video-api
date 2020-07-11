export enum PaginationUrlType {
  First,
  Last,
  Prev,
  Next
}

export type ResponseData = {
  data: Array<Record<string, any>>
}

export type ResponseDataWithPagination = ResponseData & {
  first: string
  last: string
  prev: string
  next: string
}

export type ResponseDataFormatterOptions = {
  url?: string
  page?: number
  size?: number
}

export type ResponseDataType = ResponseData | ResponseDataWithPagination