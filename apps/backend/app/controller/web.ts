import { Controller } from 'egg';

export default class WebController extends Controller {
  public async index() {
    console.log("index agent ...",this.ctx.get('user-agent'));
    await this.ctx.render('index.html');
  }
  
  public async admin() {
    await this.ctx.render('admin.html');
  }
  
}
