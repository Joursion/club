/**
 * Created by m on 16-2-18.
 */
const Activity = require('../models').Activity;
//var cache = require('co-cache');

exports.addActivity = function (data) {
    return Activity.create(data);
};

exports.editActivity = function (id, data) {
    return Activity.findOneAndUpdate({_id : id}, {$set: {
        update_date: data.update_date,
        activity_date: data.activity_date,
        deadline: data.deadline,
        content: data.content,
        number_limit: data.number_limit
    }});
};


exports.getActivityById = function (id) {
    return Activity.findOneAndUpdate({_id: id}, {$inc: {pv : 1}}).exec();
};

exports.incCommentById = function (id) {
    return Activity.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec();
};

//增加参加人数,在activitymodels　中，不进行记录joiner
exports.incJoinById = function(id) {
    return Activity.findByIdAndUpdate({"_id": id}, {$inc: {join: 1}}).exec();
};

exports.subJoinById = function (id) {
    return Activity.findByIdAndUpdate({"_id": id}, {$inc: {join: -1}}).exec();
};

exports.getActivityByPage = function (p) {
    return Activity.find().skip((p - 1) * 10).limit(10).sort({start: -1 , end: -1}).exec();
};

exports.deleteActivity = function (id) {
    return Activity.findByIdAndRemove(id);
};

exports.getActivityByName = function (name) {
    return Activity.find({name: name})
};

exports.getActivityCount = function () {
  return Activity.count().exec();
};

exports.getHotActivity = function () {
    return Activity.find({}, {'title':true}).sort('-comment -pv').limit(5).exec();
};

exports.setTop = function(id, top) {
    return Activity.findOneAndUpdate({_id: id}, {$set:{'top':top}}).exec();
}

exports.getUserActivity = function(user) {
    return Activity.find({creator: user}, {'title': true, 'type':true}).sort('-create_at').exec()
}