export class ResponseData {
  data: Record<string, any>
  code: number
  status: string
  message: string

  constructor(data: Record<string, any>, code: number = 200, status: string = "success", message: string = "") {
    this.data = data
    this.code = code
    this.status = status
    this.message = message
  }

  toString() {
    return JSON.stringify({
      data: this.data,
      code: this.code,
      status: this.status,
      message: this.message
    })
  }
}
