import { APIBase } from './base'
// import request from '@/utils/request'
class APISpiderJob extends APIBase {
  constructor () {
    super('spiderjobs')
  }
}
const apiSpiderJob = new APISpiderJob()

export default apiSpiderJob
