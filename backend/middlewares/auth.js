'use strict';

const Cache = require('../tools/cache');

/** 验证登录的中间件 */
exports.userCheck = function* (next) {
    let header = this.request.header;
    if (header && header.cookie) {
        let tmpCookie = header.cookie;
        let token;// = tmpCookie[1];
        console.log('valid check', tmpCookie);
        if (typeof tmpCookie == 'string') {
            token = tmpCookie.split('=')[1];
        }
        if (token && typeof token == 'string') {
            let status = yield Cache.get(`token:${token}`);
            console.log('status===', status);
            if (status) {
                this.user = status;
                this.token = token;
                yield next;
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
        let token;// = tmpCookie[1];
        console.log('valid check', tmpCookie);
        if (typeof tmpCookie == 'string') {
            token = tmpCookie.split('=')[1];
        }
        if (token && typeof token == 'string') {
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

