import { DEFAULT_PAGINATION_SIZE } from "../constants"
import { ResponseDataOptions } from "./types"
import { isExists } from "./commons"

export function formatResponseData(data: Record<string, any>, _options?: ResponseDataOptions) {
  const defaultOptions: ResponseDataOptions = {
    page: null,
    code: 200,
    status: 'success',
    message: ''
  }
  const response = {
    data,
    ...defaultOptions,
    ..._options
  }
  if (!isExists(response.page)) {
    delete response.page
  }
  return response
}

// Taken from: https://stackoverflow.com/a/42761393
export function paginate(array: Array<Record<string, any>>, pageNumber: number, pageSize: number = DEFAULT_PAGINATION_SIZE,) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}
