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

    public async sendCode() {
        console.log("sendcode ...",this.ctx.query);
        const email = this.ctx.query.email;
        this.ctx.service.email.send(email);
        this.onRespose({status:200,message:'ok'});
    }

    async register() {
        console.log("register ...",this.ctx.request.body);
        const params = this.ctx.request.body;
        // const code = await this.ctx.service.email.generateCode();
        const result = await this.ctx.service.email.verify(params.token);
        if (!result) {
            this.onRespose({status:412,message:'无效验证码'});
        } else {
            // params['role_id'] = 'user';
            // params['user_name'] = params.name;
            const entity = await this.ctx.model.User.create(params);
            // const entity = await this.ctx.model.User.create(params, {
            //     include: [ {
            //         model: this.ctx.model.UserRole,
            //         through: this.ctx.model.UserRole,
            //     } ]
            //   });
            await this.ctx.model.UserRole.create({user_name: params.name,role_id: 'user',operator: 'self'});
            // console.log("result ...",result);
            this.onRespose({status:201,message:entity});
        }
    }
}
module.exports = UserController;