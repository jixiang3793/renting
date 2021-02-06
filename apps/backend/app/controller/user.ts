// const Controller = require('egg').Controller;
// const BaseController = require('./base');
import BaseController from './base';

class UserController extends BaseController {
    constructor(ctx) {
        super(ctx,'user');   
    }
}
module.exports = UserController;