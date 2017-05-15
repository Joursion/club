"use strict"

const redis = require('./redis')

exports.del = function(keyname) {
    return new Promise((resolve, reject) => {
        redis.del(keyname, function(err, data) {
            if(err) {
                console.log('del ', keyname, 'errror', err)
                return reject(err)
            }
            return resolve(data)
        })
    })
}

/**String */
exports.get = function (keyname) {
    return new Promise((resolve, reject) => {
        redis.get(keyname, (err, data) => {
            if (err) {
                return reject(err)
            } else {
                data = JSON.parse(data)
                return resolve(data)
            }
        })
    })
}

/**
 * @param time {Number} 单位s
 */
exports.set = function (key, value, time) {
    return new Promise((resolve, reject) => {
        if (key && value) {
            value = JSON.stringify(value);
            if (time) {
                redis.setex(key, time, value, function(err,data) {
                    if(err) {
                        return reject(err)
                    } 
                    return resolve(data)
                })
            } else {

                redis.set(key, value, function(err,data) {
                    if(err) {
                        return reject(err)
                    }
                    return resolve(data)
                })
            }
        }
    })
}

/**hash */
exports.hset = function(hashKey, key, value) {
    return new Promise((resolve, reject) =>{
        redis.hset(hashKey, key, value, function(err,data) {
            if(err) {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

exports.hdel = function(hashKey, key) {
    return new Promise((resolve, reject) => {
        redis.hdel(hashKey, key,(err,data) =>{
            if(err) {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

exports.hgetall = function(hashKey) {
    return new Promise((resolve, reject) =>{
        redis.hgetall(hashKey, (err,data) =>{
            if(err) {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

/**set */

exports.sadd = function(keyname, value) {
    return new Promise((resolve, reject) => {
        redis.sadd(keyname, value, function(err,data) {
            if(err) {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

exports.smembers = function(keyname) {
    return new Promise((resolve, reject) =>{
        redis.smembers(keyname, function(err, data) {
            if(err) {
                return reject(err)
            }
            //data = JSON.parse(data)
            return resolve(data)
        })
    })
}

exports.srem = function(keyname, value) {
    return new Promise((resolve, reject) => {
        redis.srem(keyname, value, function(err,data) {
            if(err) {
                return reject(err)
            }
            return resolve(data)
        })
    })
}
