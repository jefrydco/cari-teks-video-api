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
}
