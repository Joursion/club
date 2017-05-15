"use strict"

var mongoose = require('mongoose');
var config = require('../config/index.js').default

var mongodbUrl = config.mongodb;
console.log(mongodbUrl)

mongoose.connect(mongodbUrl.url, function (err) {
    if (err) {
        console.log('connect to %s error: ', mongodbUrl.url, err.message);
        process.exit(1);
    }
    console.log('now, this app is connect to mongodb, url:', mongodbUrl.url)
});

exports.User = require('./user');
exports.Item = require('./item');
exports.Activity = require('./activity');
// exports.ActivityCommnet = req/zzuire('./activity_comment');
exports.Join = require('./join');
// exports.GoodComment = require('./good_comment');
// exports.Star = require('./star');
exports.Message = require('./message');
// exports.Ug = require('./ug');
exports.Job = require('./job');
exports.Ask = require('./ask');
//exports.QuestionComment = require('./question_comment');
exports.Comment = require('./comment')