"use strict"

const Ask = require('../lib/ask');
const Cache = require('../tools/cache')

exports.createAsk = function*() {
    let body = this.request.body;
    if(!body.title || !body.content) {
        this.body = {
            err: 'addAsk error, invalid arguments'
        }
    }
    let data = body;
    data.creator = this.user;
   // console.log('body---', body);
    let status = yield Ask.addAsk(data);
    if(status) {
        let _id = status._id;
        this.body = {
            data: {
                _id: _id
            }
        }
    } else {
        this.body = {
            err: '服务器繁忙'
        }
    }
}

exports.getAsks = function*() {
    let data = yield Ask.getAsk();
    if(data) {
        let resData = [];
        for(let v of data) {
            let creator = v.creator;
            let avatar = yield Cache.get(`avatar:${creator}`);
            let tmpData = {
                title: v.title,
                content: v.content,
                avatar: avatar,
                create_at: v.create_at,
                pv: v.pv,
                comment: v.comment,
                _id: v._id,
                isTop: v.isTop
            }
            resData.push(tmpData)
        }
        this.body = {
            data : resData
        }
    } else {
        this.body = {
            err: '服务器繁忙～'
        }
    }
}

exports.getAskById = function* () {
    let id = this.params.id;
    if (id) {
        let data = yield Ask.getAskById(id);
        if (data) {
            let creator = data.creator;
            let avatar = yield Cache.get(`avatar:${creator}`)
            let resData = {
                content: data.content,
                avatar: avatar,
                creator: data.creator,
                pv: data.pv,
                comment: data.comment,
                title: data.title,
                _id: data._id,
                create_at: data.create_at
            }
            this.body = {
                data: resData
            }
        } else {
            this.body = {
                err: 'invalid args'
            }
        }
    } else {
        this.body = {
            err: 'invalid args'
        }
    }
}


exports.getNewAsks = function*() {
    let data = yield Cache.get('newAsks');
    console.log('===newAsks', data, typeof data)
    if(data) {
        this.body = {
            data: JSON.parse(data)
        }
    } else {
        let data = yield Ask.getNewAsk();
        Cache.set('newAsks', JSON.stringify(data), 60*60);
        this.body = {
            data: data
        }
    }
}

exports.delAsk = function*(){
    let id = this.request.body.id;
    let user = this.user;
    let askInfo = yield Ask.getAskById(id);
    if(askInfo) {
        if(askInfo.creator == user) {
            let stat = yield Ask.deleteAsk(id);
            if(stat) {
                this.body = {
                    data: 'ok'
                }
            } else {
                this.body = {
                    err: '服务器繁忙'
                }
            }
        } else {
            let userRole = Cache.get(`user:${user}`);
            if(userRole.role == 5) {
                Ask.deleteAsk(id)
                this.body = {
                    data: 'ok'
                }
            } else {
                this.body = {
                    err: '您没有权限'
                }
            }
        }
    } else {
        this.body = {
            err: '未知参数错误'
        }
    }
}