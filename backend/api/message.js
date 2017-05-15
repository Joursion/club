"use strict"
const Cache = require('../tools/cache');
const Activity = require('../lib/activity');
const Item = require('../lib/item');
const Ask = require('../lib/ask');

const WEEK = 60*60*24*7
const DAY = 60*60*24

var onlineUser = []

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
        time: Date.now()
    }
    let to = tmpData.creator;
    if(to !== user) {
        Cache.sadd(`msg:${to}`, JSON.stringify(msg));
    }
    if(onlineUser[to]) {
        onlineUser[to].emit(`to${to}`, {msg: msg})
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

/**在线消息的推送 */
function online (io) {
    io.on('connection', function (socket) {
        console.log('is connection');
        socket.on
        socket.on('setUser', function (data) {
            console.log(data);
            onlineUser[data.user] = socket;
        });
        socket.on('disconnect', function(data){
            
            console.log('connection is disconnect!', data);
            onlineUser[data.user] = null;
        });
    });

}
exports.online = online