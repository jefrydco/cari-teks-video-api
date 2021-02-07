import { parse, stringifyUrl } from 'query-string'
import normalizeUrl from 'normalize-url'

import { PaginatorUrlType } from '../types'

import type { Vtt, FormatterOptions } from '../types'

export function paginatorReplacer(
  type: PaginatorUrlType,
  options: FormatterOptions
): string | null {
  const last = Math.ceil(options.dataLength / options.size)
  const normalizedUrl = normalizeUrl(options.reqUrl, {
    removeQueryParameters: [/./]
  })
  let query = parse(options.reqUrl.replace(normalizedUrl, ''))

  if (type === PaginatorUrlType.First) {
    query = {
      ...query,
      page: '1'
    }
  } else if (type === PaginatorUrlType.Last) {
    if (options.dataLength !== 0) {
      query = {
        ...query,
        page: `${last}`
      }
    } else {
      query = {
        ...query,
        page: '1'
      }
    }
  } else if (type === PaginatorUrlType.Prev) {
    if (options.dataLength !== 0 && options.page > 1) {
      query = {
        ...query,
        page: `${options.page - 1}`
      }
    } else {
      return null
    }
  } else if (type === PaginatorUrlType.Next) {
    if (options.dataLength !== 0 && options.page < last) {
      query = {
        ...query,
        page: `${options.page + 1}`
      }
    } else {
      return null
    }
  }
  return normalizeUrl(
    stringifyUrl({
      url: normalizedUrl,
      query
    })
  )
}

// Taken from: https://stackoverflow.com/a/42761393
export function paginator(array: Vtt[], pageNumber: number, pageSize: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}
