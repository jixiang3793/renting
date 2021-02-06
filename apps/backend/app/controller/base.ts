const Controller = require('egg').Controller;

class BaseController extends Controller {
    name: string;
    mname: string;

    constructor(ctx, name: string) {
      super(ctx);
      this.name = name;
      this.mname = name.charAt(0).toUpperCase() + name.substring(1);
    }

  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  }
  
  async index() {
    const ctx = this.ctx;
    const query = { limit: this.toInt(ctx.query.limit), offset: this.toInt(ctx.query.offset) };
    ctx.body = await ctx.model[this.mname].findAll(query);
  }
  async new() {
  }
  async show() {
  }
  async edit() {
  }
  async create() {
    const ctx = this.ctx;
    const user = await ctx.model[this.mname].create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }
  async update() {
  }
  async destroy() {
  }
}

export default BaseController;
// module.exports = BaseController;
