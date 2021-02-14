import { APIBase } from './base'
// import request from '@/utils/request'
class APISpiderJobLog extends APIBase {
  constructor () {
    super('spiderjoblogs')
  }
}
const apiSpiderJobLog = new APISpiderJobLog()

export default apiSpiderJobLog
