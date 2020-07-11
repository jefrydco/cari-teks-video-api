import { DEFAULT_PAGINATION_SIZE } from "../constants"
import { ResponseDataOptions } from "./types"

export class ResponseData {
  data: Record<string, any>
  page: number
  code: number
  status: string
  message: string

  constructor(data: Record<string, any>, options?: ResponseDataOptions) {
    this.data = data
    this.page = options.page
    this.code = options.code || 200
    this.status = options.status || 'success'
    this.message = options.message || ''
  }

  toString() {
    if (this.page) {
      return JSON.stringify({
        data: this.data,
        page: this.page,
        code: this.code,
        status: this.status,
        message: this.message
      })
    }
    return JSON.stringify({
      data: this.data,
      code: this.code,
      status: this.status,
      message: this.message
    })
  }
}

// Taken from: https://stackoverflow.com/a/42761393
export function paginate(array: Array<Record<string, any>>, pageNumber: number, pageSize: number = DEFAULT_PAGINATION_SIZE,) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}
