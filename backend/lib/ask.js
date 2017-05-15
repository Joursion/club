var Ask = require('../models').Ask;

exports.addAsk = function (data) {
    return Ask.create(data);
};

exports.deleteAsk = function (id) {
    return Ask.findOneAndRemove({
        _id: id
    }).exec();
};

exports.getAsk = function () {
    //return Ask.find().limit(20).sort('create_at').exec();
    return Ask.find().limit(20).sort('-isTop -create_at').exec();
};

exports.getAskById = function (id) {
    return Ask.findOneAndUpdate({_id: id},{$inc: {pv : 1}}).exec();
};

exports.getNewAsk = function () {
    return Ask.find({}).sort('create_at').limit(5).exec();
};

exports.getHotAsk = function () {
    return Ask.find({solved: false}).sort('-pv').limit(4).exec();
};

exports.solveAsk = function (id) {
    return Ask.findOneAndUpdate({_id: id},{$set: {solved: true}}).exec();
};

exports.incCommentById = function (id) {
    return Ask.findOneAndUpdate({_id: id}, {$inc: {comment: 1}}).exec();
};

exports.getUserAsk = function(user) {
    return Ask.find({creator: user}, {title:true, type: true}).sort('-create_at').exec()
}

