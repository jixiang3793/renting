import CurdController from './curd';

// const Role = require('../model/role');
class SpiderJobController extends CurdController {
    constructor(ctx) {
        super(ctx,'spiderjob');
    }
}

module.exports = SpiderJobController;