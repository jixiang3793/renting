import BaseController from "./base";

// const Controller = require('egg').Controller;

class CurdController extends BaseController {
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
    const limit = this.toInt(this.ctx.query.pageSize);
    const offset = limit * (this.toInt(this.ctx.query.pageNo) - 1);
    const query = { limit,offset };
    const { count, rows } = await ctx.model[this.mname].findAndCountAll(query);
    ctx.body = {result:{ data:rows,pageSize:limit,pageNo:this.toInt(this.ctx.query.pageNo),totalCount: count }};
  }
  async new() {
  }
  async show() {
  }
  async edit() {
  }
  async create() {
    const ctx = this.ctx;
    const entity = await ctx.model[this.mname].create(ctx.request.body);
    ctx.status = 201;
    ctx.body = entity;
  }
  async update() {
  }
  async destroy() {

  }

}

export default CurdController;
// module.exports = BaseController;
