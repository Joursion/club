/**
 * Created by m on 16-2-16.
 */
var User = require('../models').User;

exports.addUser = function (data) {
    return User.create(data);
};

exports.getUserById = function (id) {
    return User.findOne({_id: id}).exec();
};

exports.getUserByName = function (username) {
    return User.findOne({username: username}).exec();
};

exports.adminGet = function () {
    return User.find().sort('update_at').exec();
};

exports.updateState = function (username){
    return User.findOneAndUpdate({username: username}, {$set: {state: 1}}).exec();
};

exports.deleteUser = function (username, cb) {
    return User.findOneAndRemove({username: username}).exec((err,res) =>{
        return cb(err, res)
    });
};

exports.getUserByEmail = function(email) {
    return User.findOne({email: email}).exec();
}

exports.changeAvatar = function(username, url) {
    //return User.findOneAndUpdate({username: username},{$set:{url:'12123'}}).exec()
    return User.update({username: username}, {$set:{url:url}}).exec(function(err,data) {
        if(err) {
            console.log(err)
            return err
        }
        console.log('changeAvatar',data)
        return data;
    })
}