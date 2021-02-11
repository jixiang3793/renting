import CurdController from './curd';

// const Role = require('../model/role');
class UserController extends CurdController {
    constructor(ctx) {
        super(ctx,'user');
    }

    public async current() {
        const user = this.ctx.state.user;
        const result = await this.ctx.model.User.findOne({
            where: { name: user.name },
            include: 
              [{model: this.ctx.model.Role}]
            });
        console.log("login user ...",user,result);
        this.onRespose({status:200,message: {result: result}});
    }

    public async normal() {
        const user = this.ctx.state.user;
        const { count, rows } = await this.ctx.model.User.findAndCountAll({
            include: [{
                model: this.ctx.model.Role,
                through: {where: {roleId: 'user'}},
                right: true
            }],
            limit: this.ctx.request.body.pageSize,
            offset: this.ctx.request.body.pageSize * (this.ctx.request.body.pageNo - 1)
        })
        console.log("login user ...",user,rows);
        this.onRespose({status:200,message: {result: {
            totalCount: count,
            data: rows,
            pageSize: this.ctx.request.body.pageSize,
            pageNo: this.ctx.request.body.pageNo
        }}});
    }
}
module.exports = UserController;