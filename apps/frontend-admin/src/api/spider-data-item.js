import { APIBase } from './base'
// import request from '@/utils/request'
class APISpiderDataItem extends APIBase {
  constructor () {
    super('spiderdataitems')
  }
}
const apiSpiderDataItem = new APISpiderDataItem()

export default apiSpiderDataItem
