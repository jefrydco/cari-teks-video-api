import { DEFAULT_PAGINATION_SIZE } from "../constants"
import { ResponseDataOptions } from "./types"
import { isExists } from "./commons"

export class ResponseData {
  data: Record<string, any>
  options: ResponseDataOptions

  constructor(data: Record<string, any>, _options?: ResponseDataOptions) {
    const defaultOptions: ResponseDataOptions = {
      page: null,
      code: 200,
      status: 'success',
      message: ''
    }
    this.data = data
    this.options = {
      ...defaultOptions,
      ..._options
    }
  }

  toJSON() {
    if (isExists(this.options.page)) {
      return JSON.stringify({
        data: this.data,
        ...this.options
      })
    }
    return JSON.stringify({
      data: this.data,
      ...this.options
    })
  }
}

// Taken from: https://stackoverflow.com/a/42761393
export function paginate(array: Array<Record<string, any>>, pageNumber: number, pageSize: number = DEFAULT_PAGINATION_SIZE,) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}
