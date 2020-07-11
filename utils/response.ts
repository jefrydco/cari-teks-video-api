export class ResponseData {
  data: Record<string, any>

  constructor(data: Record<string, any>) {
    this.data = data
  }

  toString() {
    return JSON.stringify({
      code: 200,
      status: "success",
      message: "",
      data: this.data
    })
  }
}
