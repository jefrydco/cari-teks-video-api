import queryString from 'query-string'
import normalizeUrl from 'normalize-url'
import { ResponseDataFormatterOptions, ResponseDataType, ResponseDataWithPagination, PaginationUrlType, Vtt } from "./types"

function paginationUrlReplacer(type: PaginationUrlType, options: ResponseDataFormatterOptions): string | null {
  const last = Math.ceil(options.dataLength / options.size)
  const normalizedUrl = normalizeUrl(options.url, {
    removeQueryParameters: [/./]
  })
  let parsedQueryString = queryString.parse(options.url.replace(normalizedUrl, ''))

  if (type === PaginationUrlType.First) {
    parsedQueryString = {
      ...parsedQueryString,
      page: '1'
    }
  } else if (type === PaginationUrlType.Last) {
    if (options.dataLength !== 0) {
      parsedQueryString = {
        ...parsedQueryString,
        page: `${last}`
      }
    } else {
      parsedQueryString = {
        ...parsedQueryString,
        page: '1'
      }
    }
  } else if (type === PaginationUrlType.Prev) {
    if (options.dataLength !== 0 && options.page > 1) {
      parsedQueryString = {
        ...parsedQueryString,
        page: `${options.page - 1}`
      }
    } else {
      return null
    }
  } else if (type === PaginationUrlType.Next) {
    if (options.dataLength !== 0 && options.page < last) {
      parsedQueryString = {
        ...parsedQueryString,
        page: `${options.page + 1}`
      }
    } else {
      return null
    }
  }
  return normalizeUrl(`${normalizedUrl}?${queryString.stringify(parsedQueryString)}`)
}

export function formatResponseData(data: Vtt[], options?: ResponseDataFormatterOptions): ResponseDataType {
  let _responseData: ResponseDataType = {
    data
  }
  if (options.page) {
    _responseData = {
      ..._responseData,
      first: paginationUrlReplacer(PaginationUrlType.First, options),
      last: paginationUrlReplacer(PaginationUrlType.Last, options),
      prev: paginationUrlReplacer(PaginationUrlType.Prev, options),
      next: paginationUrlReplacer(PaginationUrlType.Next, options),
      total: options.dataLength
    } as ResponseDataWithPagination
  }
  return _responseData
}

// Taken from: https://stackoverflow.com/a/42761393
export function paginate(array: Vtt[], pageNumber: number, pageSize: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}
