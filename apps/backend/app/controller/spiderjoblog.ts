import CurdController from './curd';

// const Role = require('../model/role');
class SpiderJobLogController extends CurdController {
    constructor(ctx) {
        super(ctx,'spiderjob');
    }
}

module.exports = SpiderJobLogController;