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
        let num = Math.floor(Math.random()*62);
        data += CHECK_NUM[num]; 
    }
    return data;
}