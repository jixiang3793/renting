import { APIBase } from './base'
import request from '@/utils/request'
class APIUser extends APIBase {
  constructor () {
    super('users')
  }

  getNormalUserList (parameter) {
    return request({
      url: `/${this.name}/normal`,
      method: 'post',
      data: parameter
    })
  }
}
const apiUser = new APIUser()

export default apiUser
