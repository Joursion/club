'use strict';

const Cache = require('../tools/cache');
const Tools = require('../tools/index')

/** 验证登录的中间件 */
exports.userCheck = function* (next) {
    let header = this.request.header;
    if (header && header.cookie) {
        let tmpCookie = header.cookie;
        let token = Tools.getCookie(tmpCookie, 'user');
        if (token && typeof token == 'string') {
            let status = yield Cache.get(`token:${token}`); //根据token判断用户信息
            console.log('status', status, token)
            if (status) {
                this.user = status;
                this.token = token;
                yield next;  //通过身份验证，执行next
            } else {
                this.body = { err: 'invalid request', };
            }
        } else {
            this.body = { err: 'invalid request', };
        }
    } else {
        this.body = { err: 'invalid request', };
    }
};

exports.isSignin = function*(next) {
    let header = this.request.header;
    if (header && header.cookie) {
        let tmpCookie = header.cookie;
        let token = Tools.getCookie(tmpCookie, 'user');
        if (token) {
            let status = yield Cache.get(`token:${token}`);
            if (status) {
                this.user = status;
                this.token = token;
            }
        } 
    }
    yield next;
};


/** 验证管理员中间件 */
exports.adminCheck = function* (next) {
    let token = this.token;
    let length = token.length;
    if (token[length - 1] >= 5) {
        yield next;
    } else {
        this.body = {
            err: '权限不足',
        };
    }
};


