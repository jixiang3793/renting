const BaseSpider = require('../base');
const {By} = require('selenium-webdriver');
const {to} = require('await-to-js');

class RentingWubaSpider extends BaseSpider {

    constructor(params) {
        super(params);
    }

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