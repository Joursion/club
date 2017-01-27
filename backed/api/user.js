"use strict"

const User = require('../lib/user');
const Activity = require('../lib/activity');
const Ask = require('../lib/ask')
const Item = require('../lib/item')
const Tool = require('../tools/index');
const Mail = require('./mail');
const Cache = require('../tools/cache')

const initialAvatar = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTc1j0-QTIkOngZxz3SzNZ4X_RVkiqDz40UKFLHnven0hqsDbmr'

const DAY = 60*60*24

exports.signup = function* () {
    let body = this.request.body;
    console.log('signup ===', body);
    let username = body.username;
    let password = body.password;
    let checknum = body.checknum;
    let email = body.email
    if (username) {
        let exist = yield User.getUserByName(username);
        console.log(exist);
        if (exist) {
            //console.warn('用户名已经存在', username);
            this.body = { err: "用户名或者邮箱已经被注册" };
        } else {
            // exist = yield User.getUserByEmail(email)
            // if (exist) {
            //     this.body = { err: "用户名或者邮箱已经被注册" };
            // }

            if(Cache.get(`checkNum:${email}`) !== checknum) {
                this.body = {
                    err : '非法验证信息'
                }
            } else {
                //let tmpPassword = Tool.initHashPassword(username, password);
                let data = {
                    email: email,
                    password : Tool.initHashPassword(username, password),
                    username : username,
                    role:1,
                    url: initialAvatar
                }
                yield User.addUser(data);
                let token = Tool.initToken(username, 1);
                this.cookies.set('user', token);
                Cache.set(`token:${token}`, username, DAY);
                this.body = {
                    data: 'ok'
                }
            }
        }
    } else {
        this.body = {
            err: '参数不完整'
        }
    }
}

exports.signin = function* () {
    let data = this.request.body;
    console.log(data);
    let username = data.username;
    let password = data.password;
    if (username && password) {
        let userInfo = yield User.getUserByName(username);
        password = Tool.initHashPassword(username, password);
        console.log('密码相关==',userInfo, password);
        if (!userInfo || (userInfo.password !== password)) {
            this.body = { err: "用户名或者密码错误" };
        } else {
            //console.log('密码应该有的', userInfo.password, '我现在的', password);
            let token = Tool.initToken(username, 1);
            console.log(token);
            
            Cache.set(`token:${token}`, username , DAY);
            Cache.set(`avatar:${username}`, userInfo.url);
            this.cookies.set('user', token);
            this.body = {
                data: {
                    username: username,
                    avatar: userInfo.url
                }
            };
        }
    } else {
        this.body = {
            err: 'invalid args'
        }
    }
    // if(username && password) {
    //     let token = Tool.initToken(username,1);
    //     //this.set({'Access-Control-Allow-Credentials': true})
    //     this.cookies.set(username, token, {httpOnly:false})
    //     console.log('setcookie')   
    //     this.body = {
    //         data: {
    //             username: username
    //         }
    //     }
    // }
}

exports.signout = function*(){
    this.cookies.set('user', '');
    this.body = {
        data :'ok'
    }
}


exports.reset = function*() {
    let body = this.request.body;
    console.log('请求重置信息',body);
    let checkNum = body.checkNum;
    let password = body.password;
    if(checkNum && password) {
        if(Cache.get(`checkNum:${email}`) == checkNum) {
            let username = User.getUserByEmail(email);
            if(!username) {
                this.body = {
                    err: '重置失败，请检验验证信息或着邮箱'
                }
            }
            User.setNewPassword(email, Tool.initHashPassword(username, password))
            this.body = {
                data: 'ok'
            }
        }
    }
}

exports.getCheckNum = function*() {
    let body = this.request.body;
    let email = body.email;
    console.log('请求验证码的消息', body)
    if(!email || !body) {
        this.body = {err: '请输入正确的邮箱'}
    }
    let isExist = User.getUserByEmail(email);
    if(isExist) {
        this.body = {
            err: '此邮箱已经占用，点击忘记密码？'
        }
    }
    let cache = yield Cache.get(`checkNum:${email}`);
    console.log('获取新的验证码的cache', cache);
    if(cache) {
        this.body = {err: '验证码已发送，请三分钟后重试'}
    } else {
        let checkNum = Tool.initCheckNum();
        Cache.set(`checkNum:${email}`, checkNum, 3*60);
        
        // Mail.send('小龙包','joursion@126.com', 123445);
        Mail.send(`用户${email}`, email, checkNum);
        this.body = {data : 'ok'}
    }
}

exports.check = function*() {
    let cookie = this.request.headers.cookie;
    if(cookie) {
        let tmpCookie = cookie.split('=');
        let token = tmpCookie[1];
        if(token) {
            let user = yield Cache.get(`token:${token}`);
            let avatar = yield Cache.get(`avatar:${user}`)
            console.log('有headder', cookie, user);
            if(user) {
                //let userInfo = User.getUserByName(data);
                //let username = 'yyyyyy'
                this.body = {
                    data: {
                        username: user,
                        avatar: avatar
                    }
                }
            }
        } 
    } else {
        this.body = {
            err: 'no headers'
        }
    }
}


exports.changeAvatar = function*(){
    let user = this.user;
    let url = this.request.body.url;
    if(!url) {
        this.body = {
            err: '服务器繁忙'
        }
    }
    console.log('改头像了//////', user, url)
    let stat = yield User.changeAvatar(user, url);
    yield Cache.set('avatar:${user}',url);
    console.warn('stat',stat)
    if(stat) {
        this.body = {
            data: url
        }
    } else {
        this.body = {
            err: '服务器繁忙'
        }
    }
}

exports.getUser = function*(){
    let user = this.user;
    let userInfo = yield User.getUserByName(user);
    let totalPublish = [];
    let pActivity = yield Activity.getUserActivity(user);
    for(let i in pActivity) {
        pActivity[i].type = 'activity'
    }
    let pItem = yield Item.getUserItem(user);
    for(let i in pItem) {
        pItem[i].type = 'item'
    }
    let pAsk = yield Ask.getUserAsk(user);
    for(let i in pAsk) {
        pAsk[i].type = 'ask'
    }
    console.warn(pActivity, pItem, pAsk)
    totalPublish = totalPublish.concat(pActivity);
    totalPublish = totalPublish.concat(pItem);
    totalPublish = totalPublish.concat(pAsk);
    
    console.log('一共的发布--', totalPublish);
    //for(let v of pActivity)

    this.body = {
        data :{
            info: userInfo,
            publish: totalPublish
        }
    }
}

