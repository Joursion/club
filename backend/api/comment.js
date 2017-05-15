"use strict"

const Comment = require('../lib/comment');
const Activity = require('../lib/activity');
const Item = require('../lib/item');
const Ask = require('../lib/ask');
const Cache = require('../tools/cache');
const Msg = require('./message');

/**
 * {id,content, user,create_at}
 */
exports.addComment = function* () {
    let body = this.request.body;
    let type = body.type;
    let id = body.id;
    let user = this.user;

    let msg = '';
    if (type && id) {
        switch (type) {
            case 'item': {
                Item.incCommentById(id);
                console.log('即将添加消息---');
                yield Msg.addMessage(user, 'comment', 'item', id)
                //let title = Item.getItemById(id).title;
                //Cache.hset(`msg:${user}`, title, )
                break;
            }
            case 'activity': {
                Activity.incCommentById(id);
                console.log('即将添加消息---',type);
                yield Msg.addMessage(user, 'comment', 'activity', id)
                break;
            }
            case 'ask': {
                Ask.incCommentById(id)
                yield Msg.addMessage(user, 'comment', 'ask', id)
                break;
            }
            default: break;
        }
    }

    console.log('addComment', body);

    let status = yield Comment.addComment(body);

    if (status) {
        this.body = {
            data: body
        }
    } else {
        this.body = {
            err: 'addComment error'
        }
    }
}

exports.getComments = function* () {
    let id = this.params.id;
    let comments = yield Comment.getComment(id)
    
    if (comments) {
        let resData = [];
        for(let v of comments) {
            let user = v.username;
            let avatar = yield Cache.get(`avatar:${user}`)
            let tmpData = {
                username: v.username,
                create_at: v.create_at,
                avatar: avatar|| '',
                content: v.content
            }
            resData.push(tmpData)
        }
        this.body = {
            data: resData
        }
    } else {
        console.log('err getComments')
        this.body = {
            err: 'no comments'
        }
    }
}

exports.replyComment = function* () {
    let body = this.request.body;
    if (body._id && body.reply) {
        let status = yield Comment.replyComment(body._id, body.reply);
        if (status) {
            this.body = {
                data: 'ok'
            }
        }
    }
}