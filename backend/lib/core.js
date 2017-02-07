/**
 * Created by m on 16-2-16.
 */
var User = require('./user');
var Item = require('./item');
var Activity = require('./activity');
// var ActivityComment = require('./activity_comment');
// var GoodComment = require('./good_comment');
var Join = require('./join');
var Star = require('./star');
var Message = require('./message');
var Ug = require('./ug');
var Job = require('./job');
var ask = require('./ask');
//var QuestionComment = require('./question_comment');

module.exports = {
    get $User () {
        return User;
    },
    get $Item () {
        return Item;
    },
    get $Activity () {
        return Activity;
    },
    get $Join () {
        return Join;
    },
    get $Star() {
        return Star;
    },
    get $Message() {
        return Message;
    },
    get $Ug() {
        return Ug;
    },
    get $Job() {
        return Job;
    },
    get $Question() {
        return Question;
    },
    // get $QuestionComment() {
    //     return QuestionComment;
    // }
};


