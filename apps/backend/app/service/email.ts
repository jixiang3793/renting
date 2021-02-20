const Service = require('egg').Service;
const nodemailer = require("nodemailer");

class EmailService extends Service {
    codeLen = 6;
    expireTime = 120;
    transporter: any = null;

    initEmail() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: '1013777405@qq.com', // generated ethereal user
              pass: 'snktqmkiaqoibcai', // generated ethereal password
            },
          });
    }
    async generateCode(): Promise<string> {
      return new Promise(async (resolve) => {
        let code = '';
        for (let i = 0; i < this.codeLen; i++) {
            code += Math.floor(Math.random()*10);
        }
        await this.app.redis.set(code, code);
        await this.app.redis.expire(code, this.expireTime);
        resolve(code);
      })
        
    }
  async send(toEmail: string) {
    if (!this.transporter) {
        this.initEmail();
    }
    const info = await this.transporter.sendMail({
        from: '1013777405@qq.com', // sender address
        to: toEmail, // list of receivers
        subject: "用户注册", // Subject line
        text: `注册验证码为${await this.generateCode()}`, // plain text body
      });
    
      console.log("Message sent: %s", info.messageId);
  }

  verify(code): Promise<void> {
    return new Promise(async (resolve) => {
      const result = await this.app.redis.get(code);
      resolve(result);
    })
  }
}

module.exports = EmailService;