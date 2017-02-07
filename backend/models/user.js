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
    url:{type: String},
    role: {type: Number}, //权限等级 1 普通， 5 管理员
    url: {type: String, default:'http://7xrkb1.com1.z0.glb.clouddn.com/2a591fc8-eae7-44b3-9b95-485d03134f57.jpg'}, //头像
});

UserSchema.index({username: 1});

module.exports = mongoose.model('User', UserSchema);
