import { APIBase } from './base'
import request from '@/utils/request'
class APISpiderJob extends APIBase {
  constructor () {
    super('spiderjobs')
  }
  pause () {
    return request({
      url: `/spiderjobs/pause`,
      method: 'get'
    })
  }
  resume () {
    return request({
      url: `/spiderjobs/resume`,
      method: 'get'
    })
  }
}
const apiSpiderJob = new APISpiderJob()

export default apiSpiderJob
