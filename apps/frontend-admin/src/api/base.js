import request from '@/utils/request'

export class APIBase {
  // name = ''
  constructor (name) {
    this.name = name
  }
  toQuery (parameter) {
    return Object.keys(parameter).map(it => `${it}=${parameter[it]}`).join('&')
  }
  list (parameter) {
    return request({
      url: `/${this.name}?${this.toQuery(parameter)}`,
      method: 'get'
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
  delete (id) {
    return request({
      url: `/${this.name}/${id}`,
      method: 'DELETE'
    })
  }
}
