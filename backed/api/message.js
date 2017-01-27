"use strict"
const Cache = require('../tools/cache');
const Activity = require('../lib/activity');
const Item = require('../lib/item');
const Ask = require('../lib/ask');

const WEEK = 60*60*24*7
const DAY = 60*60*24

/**
 * hash
 */
function* getMessage() {
    let user = this.user;
    let msg = yield Cache.smembers(`msg:${user}`);
    msg = msg || [];
    for(let i in msg) {
        msg[i] = JSON.parse(msg[i])
    }
    if(msg) {
        console.log(user,'我的消息是.', msg);
        this.body = {
            data: {
                msg: msg,
                num: msg.length || 0
            }
        }
    }
}
exports.getMessage = getMessage;

/**
 * @params  type 种类 ： 回复，收藏，参加
 * //@params  itemType :  item, activity, ask 等
 * @params  id        :  项目的id
 */
function *addMessage (user , type, itemType, id) {
    console.log('添加消息的 消息', user);
    let tmpData = {};
    switch(itemType) {
        case 'item': {
            tmpData = yield Item.getItemById(id)
            break;
        }
        case 'activity': {
            tmpData = yield Activity.getActivityById(id);
            break;
        }
        case 'ask': {
            tmpData = yield Ask.getAskById(id)
            break;
        }
        default: {
            tmpData = null
        }
    }
    if(!tmpData) {
        return 
    }

    let msg = {
        f: user,
        type: type,
        title: tmpData.title,
        url: itemType + '/' + tmpData._id,

    }
    let to = tmpData.creator;
    console.log('即将要创建的消息', msg, to);
    if(to) {
        console.log('我添加了消息');
        Cache.sadd(`msg:${to}`, JSON.stringify(msg));
    }
}
exports.addMessage = addMessage


function *delMessage() {
    let user = this.user;
    let stat = yield Cache.del(`msg:${user}`)
    if(stat) {
        this.body = {
            data: 'ok'
        }
    } else {
        this.body = {
            err: '服务器繁忙～'
        }
    }
}

exports.delMessage = delMessage