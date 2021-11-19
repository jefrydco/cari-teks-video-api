import { parse, stringifyUrl } from 'query-string'
import normalizeUrl from 'normalize-url'

import { PaginationUrlType } from '../types'

import type {
  FormatterOptions,
  FormatterReturnType,
  VttWithMetaPagination,
  Vtt
} from '../types'

function getPaginationUrl(
  type: PaginationUrlType,
  options: FormatterOptions
): string | null {
  if (options.dataLength === 0) {
    return null
  }

  const last = Math.ceil(options.dataLength / options.size)
  const normalizedUrl = normalizeUrl(options.reqUrl, {
    removeQueryParameters: [/./]
  })
  let query = parse(options.reqUrl.replace(normalizedUrl, ''))

  if (type === PaginationUrlType.First) {
    query = {
      ...query,
      page: '1'
    }
  } else if (type === PaginationUrlType.Last) {
    query = {
      ...query,
      page: `${last}`
    }
  } else if (type === PaginationUrlType.Prev) {
    if (options.page > 1) {
      query = {
        ...query,
        page: `${options.page - 1}`
      }
    }
  } else if (type === PaginationUrlType.Next) {
    if (options.page < last) {
      query = {
        ...query,
        page: `${options.page + 1}`
      }
    }
  }
  return normalizeUrl(
    stringifyUrl({
      url: options.isSearch ? `${normalizedUrl}/search` : normalizedUrl,
      query: {
        ...query,
        q: options.q,
        marked: options.marked ? 1 : 0,
        paginated: options.paginated ? 1 : 0
      }
    })
  )
}

export function formatter(
  data: Vtt[],
  options?: FormatterOptions
): FormatterReturnType {
  let _responseData: FormatterReturnType = {
    data,
    meta: options.meta
  }
  if (options.page) {
    _responseData = {
      ..._responseData,
      first: getPaginationUrl(PaginationUrlType.First, options),
      last: getPaginationUrl(PaginationUrlType.Last, options),
      prev: getPaginationUrl(PaginationUrlType.Prev, options),
      next: getPaginationUrl(PaginationUrlType.Next, options),
      total: options.dataLength,
      page: options.page
    } as VttWithMetaPagination
  }
  return _responseData
}
