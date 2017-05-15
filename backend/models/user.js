/**
 * Created by m on 16-2-16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    reg_date: {type: Date, default :Date.now()}, //注册时间
    role: {type: Number}, //权限等级 1 普通， 5 管理员
    url: {type: String, default:'http://7xrkb1.com1.z0.glb.clouddn.com/timg.jpeg'}, //头像
});

UserSchema.index({username: 1});

module.exports = mongoose.model('User', UserSchema);
