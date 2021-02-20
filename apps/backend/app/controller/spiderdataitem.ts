import CurdController from './curd';
import areaMap from '../areamap.json';
const { Op } = require("sequelize");

// const Role = require('../model/role');
class SpiderDataItemController extends CurdController {
    constructor(ctx) {
        super(ctx,'spiderdataitem');
    }

    async listByArea() {
        const areas = this.ctx.query.areas.split(',');
        const pos = Object.values(areaMap).indexOf(areas[0]);
        const limit = this.toInt(this.ctx.query.pageSize);
        const offset = limit * (this.toInt(this.ctx.query.pageNo) - 1);
        const query = { limit,offset };
        if (pos > -1) {
            query['where'] = {
                area: {
                    [Op.like]: '%' + Object.keys(areaMap)[pos]
                  }
            };
        }
        const { count, rows } = await this.ctx.model.Spiderdataitem.findAndCountAll(query);
        this.ctx.body = {result:{ data:rows,pageSize:limit,pageNo:this.toInt(this.ctx.query.pageNo),totalCount: count }};
    }
}

module.exports = SpiderDataItemController;