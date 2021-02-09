const Controller = require('egg').Controller;

class BaseController extends Controller {

  constructor(ctx) {
    super(ctx);
  }

  onRespose({status,message}) {
    this.ctx.status = status;
    this.ctx.body = message;
  }
}

export default BaseController;
// module.exports = BaseController;
