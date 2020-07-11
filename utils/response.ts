import { DEFAULT_PAGINATION_SIZE, PAGE_REPLACEMENT_REGEX } from "../constants"
import { ResponseDataFormatterOptions, ResponseDataType, ResponseDataWithPagination, PaginationUrlType } from "./types"

function paginationUrlReplacer(type: PaginationUrlType, dataLength: number, options: ResponseDataFormatterOptions): string | null {
  const last = dataLength / options.size
  let _url = null
  if (type === PaginationUrlType.First) {
    _url = options.url.replace(PAGE_REPLACEMENT_REGEX, 'page=1')
  } else if (type === PaginationUrlType.Last) {
    _url = options.url.replace(PAGE_REPLACEMENT_REGEX, `page=${last}`)
  } else if (type === PaginationUrlType.Prev) {
    if (options.page !== 1) {
      _url = options.url.replace(PAGE_REPLACEMENT_REGEX, `page=${options.page - 1}`)
    }
  } else if (type === PaginationUrlType.Next) {
    if (options.page !== last) {
      _url = options.url.replace(PAGE_REPLACEMENT_REGEX, `page=${options.page + 1}`)
    }
  }
  return _url
}

export function formatResponseData(data: Array<Record<string, any>>, options?: ResponseDataFormatterOptions): ResponseDataType {
  let _responseData: ResponseDataType = {
    data
  }
  if (options.page) {
    _responseData = {
      ..._responseData,
      first: paginationUrlReplacer(PaginationUrlType.First, data.length, options),
      last: paginationUrlReplacer(PaginationUrlType.Last, data.length, options),
      prev: paginationUrlReplacer(PaginationUrlType.Prev, data.length, options),
      next: paginationUrlReplacer(PaginationUrlType.Next, data.length, options)
    } as ResponseDataWithPagination
  }
  return _responseData
}

// Taken from: https://stackoverflow.com/a/42761393
export function paginate(array: Array<Record<string, any>>, pageNumber: number, pageSize: number = DEFAULT_PAGINATION_SIZE,) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}
