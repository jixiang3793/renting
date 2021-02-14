import CurdController from './curd';

// const Role = require('../model/role');
class SpiderDataItemController extends CurdController {
    constructor(ctx) {
        super(ctx,'spiderdataitem');
    }
}

module.exports = SpiderDataItemController;