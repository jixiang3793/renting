import CurdController from './curd';
import Queue = require('bull') ;
import { ISpiderJob } from '@hezhi/types-renting';

class SpiderJobController extends CurdController {
    constructor(ctx) {
        super(ctx,'spiderjob');
        this.queue = new Queue('renting');
    }

  async create() {
    const ctx = this.ctx;
    const entity = await ctx.model.Spiderjob.create(ctx.request.body) as ISpiderJob;
    await this.queue.add(entity,{jobId: entity.id,repeat: {every: entity.every * 1000}});
    ctx.status = 201;
    ctx.body = entity;
  }
  async pause() {
    this.queue.pause();
    this.ctx.status = 200;
    this.ctx.body = 'ok';
  }
  async resume() {
    this.queue.resume();
    this.ctx.status = 200;
    this.ctx.body = 'ok';
  }
  async destroy() {
    const id = this.ctx.params.id;
    const jobInfo = await this.ctx.model.Spiderjob.findOne({where: {id}}) as ISpiderJob;
    await this.ctx.model.Spiderjob.destroy({where: {id}});
    await this.queue.removeRepeatable({jobId: id,every: jobInfo.every * 1000});
    this.ctx.status = 200;
    this.ctx.body = 'ok';
  }
}

module.exports = SpiderJobController;