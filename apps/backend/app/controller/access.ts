import BaseController from './base';
import { IUser } from '@hezhi/types-renting';
import errors from '../errors';

export default class AccessController extends BaseController {

  public async login() {
    const userInfo = this.ctx.request.body as IUser;
    const user = await this.ctx.model.User.findOne({ where: {name: userInfo.name} });
    console.log("login user ...",userInfo,user);
    if (user) {
        if (user.password === userInfo.password) {
            const value = this.app.jwt.sign(user.toJSON(), this.config.jwt.secret);
            this.onRespose({status:200,message: {result: {token: value}}});
        } else {
            this.onRespose(errors.access.password_error);
        }
    } else {
        this.onRespose(errors.access.not_found_user);
    }
  }
}