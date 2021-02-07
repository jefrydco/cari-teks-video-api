import { paginatorReplacer } from './paginator'
import { PaginatorUrlType } from '../types'

import type {
  FormatterOptions,
  FormatterReturnType,
  VttWithMetaPagination,
  Vtt
} from '../types'

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
      first: paginatorReplacer(PaginatorUrlType.First, options),
      last: paginatorReplacer(PaginatorUrlType.Last, options),
      prev: paginatorReplacer(PaginatorUrlType.Prev, options),
      next: paginatorReplacer(PaginatorUrlType.Next, options),
      total: options.dataLength,
      page: options.page
    } as VttWithMetaPagination
  }
  return _responseData
}
