import request from '@/utils/request'

export class APIBase {
  // name = ''
  constructor (name) {
    this.name = name
  }
  list (parameter) {
    return request({
      url: `/${this.name}`,
      method: 'post',
      data: parameter
    })
  }
  get () {}
  save (parameter) {
    return request({
      url: `/${this.name}`,
      method: 'post',
      data: parameter
    })
  }
  delete () {}
}
