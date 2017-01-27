/**
 * Created by m on 16-2-20.
 */
var Comment = require('../models').Comment;
//var cache = require('co-cache');

exports.addComment = function (data) {
    return Comment.create(data);
};

exports.getComment = function (id) {
    return Comment.find({id: id}).exec(function(err, res){
        if(err) {
            console.error('lib getComment',err);
        } 
        //console.log('lib getComment ', res);
    });
};

exports.replyComment = function(_id, reply) {
    return Comment.update({_id: _id},{$push:{reply:reply}}).exec(function(err,res){
        if(err) {
            console.log('lib replyComment err')
        }
    })
}

