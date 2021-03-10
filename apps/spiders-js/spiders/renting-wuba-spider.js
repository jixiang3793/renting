const BaseSpider = require('../base');
const {By} = require('selenium-webdriver');
const {to} = require('await-to-js');

/**
 * 58同城
 */
class RentingWubaSpider extends BaseSpider {

    constructor(params) {
        super(params);
    }

    /**
     * 1. 业务过程： 主页用户默认地址，给出用户地区的租房信息；监控页面，用户添加兴趣的地区，爬虫程序监控地区数据变化；通知页面，短信、app通知。
     * 2. 数据库设计： 获取所有地区数据，省市区/县，以省市区代号为数据库名称；所有地铁路线，以地铁站代号为数据库名称，存储数据；地区映射关心的用户；用户映射关心的最新地区租房信息
     *              area-renting
     *                  xujiahui/chuzu
     *                      renting1{}
     *                      renting2{}
     *              sub-renting
     *                  sub/l61/s3072
     *                      renting1{}
     *                      renting2{}
     *              renting
     *                  renting-user
     *                      {name: 'xujiahui/chuzu',users:['user1','user2']}
     *                  user-msg
     *                      {user:'ddsadsa',rentings: ['renting1','renting1']}
     *                  user-history
     *                      {user:'ddsadsa',rentings: ['renting1','renting1']}
     *                  users
     *                      {id: 'user1'}
     * 3. 程序设计： 客户端：获取地址，展示相关地区数据；用户注册、登录页面；监控页面，添加兴趣地区监控；通知页面，最新租房数据；发布个人房租，添加房子数据；个人主页，浏览历史、充值相关信息；
     *             客户端服务： 地址前缀匹配，查询地址相关数据；用户兴趣的地区，如果地区至少一个以上1小时，刷新页面，否则早中晚更新数据；
     *             爬虫程序端： 根据地址获取
     */
    async handle(url) {
        await this.driver.get(url);
        // .then(() => {
            // 判断页面类型
            
            // if (condition) {
                
            // }
            // this.driver.executeScript(`
            // document.querySelector("div.fr.w300").remove();
            // document.querySelector("div.s_list").nextSibling.remove();
            // document.querySelector("div.s_list").nextSibling.remove();
            // document.querySelector("div.s_list").nextSibling.remove();
            // var nodes = document.querySelectorAll("div.s_list > ul > div");
            // nodes[0].remove();nodes[1].remove();nodes[2].remove();
            // `).then(() => {
            //     this.driver.getPageSource().then(value => {
                
            //         console.log(value);
            //         console.log(crypto.createHash('md5').update(value).digest('hex') );
            //     })
            // });
            // this.driver.findElements(By.css('div.s_list > ul > div'))
            // this.driver.executeScript(`
            //     document.querySelector("div.fr.w300").remove();
            //     document.querySelector("div.s_list").nextSibling.remove();
            //     document.querySelector("div.s_list").nextSibling.remove();
            //     document.querySelector("div.s_list").nextSibling.remove();
            //     var nodes = document.querySelectorAll("div.s_list > ul > div");
            //     nodes[0].remove();nodes[1].remove();nodes[2].remove();
            // `).then(() => {
            //     this.driver.findElements(By.css('div.s_list > ul > li')).then(
            //         eles => {
            //             eles.forEach(ele => {
            //                 console.log()
            //             });
            //         }
            //     )
            // });
        // });
        let err,list,pagebar,rec_content,nextPageBtn;
        [err, list] = await to(this.driver.findElement(By.css('div.s_list')));
        [err, pagebar] = await to(this.driver.findElement(By.css('div.pagebar')));
        [err, rec_content] = await to(this.driver.findElement(By.css('div.rec_content')));
        // console.log(list, pagebar, rec_content);
        if (list && pagebar) {
            // 列表页面
            console.log(`${url} is list page`);
            // 添加数据
            let foodLabel, anodes;
            [err, anodes] = await to(this.driver.findElements(By.css('div.s_list .name > a')));
            [err, foodLabel] = await to(this.driver.findElement(By.css('div.cla_title')).getText());
            for (let index = 0; index < anodes.length; index++) {
                const anode = anodes[index];
                const foodUrl = await anode.getAttribute('href');
                // 先查询是否存在，存在则更新标签，否则新建与更新log操作日志
                let results = await this.mongoDb.collection('foods').find({url: foodUrl }).toArray();
                if (results.length === 0) {
                    // 创建菜品数据
                    const food = {
                        url: foodUrl,
                        isVisited: false,
                        labels: [foodLabel],
                        comeFrom: ''
                    }
                    this.mongoDb.collection('foods').insertOne(food);
                    await this.addUrl(foodUrl);
                } else {
                    // 更新菜品标签
                }
                console.log("results ...",foodUrl,results.length);
            }
            // console.log("foodLabel, anodes ... ",foodLabel, anodes);
            // [err, nextPageBtn] = await to(this.driver.findElement(By.css('a.nextpage')));
            // if (nextPageBtn) {
            //     await nextPageBtn.click();
            //     const cururl = await this.driver.getCurrentUrl();
                // windowhandle = await this.driver.getWindowHandle();
                // let windowhandles = await this.driver.getAllWindowHandles();
                // console.log(cururl,windowhandle,windowhandles);
            // }
        } else if (list && rec_content) {
            // 详情页面
            console.log(`${url} is detail page`);
        } else {
            // 其他页面，则抽取链接
            console.log(`${url} is other page`);
        }
    }
}

module.exports = RentingWubaSpider;