'use strict';

exports.default = {
    mongodb: {
        url: 'localhost:20217',
        name: 'mongodb'
    },
    redis: {
        url: 'localhost:20218',
        name: 'redis'
    },
    apiURL: 'localhost:3000/v1/api',
    host: 'localhost:3000',
    port: 3000,
    mail:{
        auth: {
            user: '**@**.com', //用户名
            pass: '**'  //密码
        },
        port: 587,
        host: 'smtp.qq.com'
    }
};
