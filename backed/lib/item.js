/**
 * Created by m on 16-2-17.
 */
const Item = require('../models').Item;
//var cache = require('co-cache');

exports.addItem = function (data) {
    return Item.create(data);
};

exports.getItemById = function(id) {
    return Item.findOneAndUpdate({_id: id}, {$inc: {pv: 1}}).exec();
};

//查询该用户所上架的Items
exports.getItemsByName = function (name) {
    return Item.find({'seller.name': name}).sort('-update_at').exec();
};

//根据标签来获取Item
/*exports.GetItemByTab = cache(function getItemByTab(tab, p) {
    var query = {};
    if (tab) {query.tab = tab; }
    return Item.find(query).skip((p - 1) * 20).sort('update_at').limit(20).select('-content').exec();
}, {
    key : function (tab, p) {
        tab = tab || 'all';
        return this.name + ':' + tab + ':' + p;
    }
});*/


exports.getItemByTab = function getItembytab(tab, p, limit) {
    var query = {};
    if (tab !== 'all') {
        query.tab = tab;
    }
    return Item.find(query).skip((p - 1)*limit).sort('update_at').limit(limit).exec();
};

exports.getItemsCount = function getItemsCount(tab){
    var query = {};
    if (tab !== 'all'){
        query.tab = tab;
    }
    return Item.count(query).exec();
};

exports.incCommentById = function(id) {
    return Item.findByIdAndUpdate({_id: id}, {$inc: {comment: 1}}).exec();
};

exports.editItem = function (id, data) {
    return Item.findOneAndUpdate({_id : id}, {$set: {
        update_at: data.update_at,
        prices: data.prices,
        content: data.content,
        Item_url: data.Item_url
    }});
};

//获取热门的三个闲置
exports.getHotItems = function (){
    return Item.find({},{'title': true}).sort('-comment -pv').limit(5).exec();
};

// exports.subStarById = function (id) {
//     return Item.findByIdAndUpdate(id,{$inc: {star: -1}}).exec();
// };

// exports.incStarById = function (id) {
//     return Item.findByIdAndUpdate(id,{$inc: {star: 1}}).exec();
// };

exports.delItem = function (id) {
    return Item.findOneAndRemove({_id: id}).exec();
};

exports.getUserItem = function(user) {
    return Item.find({creator: user}, {title:true, type: true}).sort('-create_at').exec()
}