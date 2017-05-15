"use strict"

const crypto = require('crypto')

const App = 'NBUT_CLUB'
const CHECK_NUM = '1234567890qwertyuiopasdfghjklzxcvbnmQAZPLOKMIJNWUSHXBYYETDCGVRF';

var s = function(str) {
    let sha1 = crypto.createHash('sha1')
    return sha1.update(str).digest('hex');
}

exports.initToken = function (username, role) {
    role = role || 1;
    let arr =  [App, Date.now, username];
    arr.sort();
    let str = arr.join('');
    let hashStr = s(str);
    hashStr = username + '|' + hashStr + role;
    return hashStr;
}

exports.initHashPassword = function(username, password) {
    let arr = [username, password, App];
    arr.sort();
    let str = arr.join('');
    let hashStr = s(str);
    return hashStr; 
}

exports.initCheckNum = function() {
    let data = '';
    let length = CHECK_NUM.length;
    for(let i = 0; i < 6; i ++ ){
        let num = Math.floor(Math.random()*length);
        data += CHECK_NUM[num]; 
    }
    return data;
}

function getCookie(cookie, name) {
    //let reg = new RegExp(name + '=[a-zA-Z]+\|[a-zA-Z0-9]+')
    let reg = new RegExp(/user=[a-zA-Z]+\|[a-zA-Z0-9]+/g);
    console.log(cookie, name, reg)
    if(typeof cookie === 'string') {
        let res = cookie.match(reg, '$1')
        console.log(res)
        if(res) {
            return res[0].split("=")[1] 
        }
        return null
    }
    return null
}
exports.getCookie = getCookie