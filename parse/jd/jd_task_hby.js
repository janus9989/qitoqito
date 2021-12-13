const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "京东1212红包雨"
        // this.cron = "1 19-23 * * *"
        this.task = 'all'
        this.thread = 7
    }

    async main(p) {
        let cookie = p.cookie
        let s = await this.curl({
                'url': `https://api.m.jd.com/client.action`,
                'form': `functionId=hby_lottery&appid=publicUseApi&body={"babelProjectId":"01102969","babelPageId":"3222650"}&t=${this.timestamp}&client=wh5&clientVersion=1.0.0&networkType=&ext={"prstate":"0"}`,
                cookie
            }
        )
        try {
            console.log(p.user, s.data.result.hbInfo.discount)
            this.notices(s.data.result.hbInfo.discount, p.user)
        } catch (e) {
            console.log("没有获得红包")
        }
    }
}

module.exports = Main;
