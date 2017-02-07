/**
 * Created by m on 16-2-17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    creator: {type: String, required: true},
    content:{type: String},
    create_at: {type: Date, default: Date.now()},
    title: {type: String}, //名称
    price: {type: Number},
    img: [{type:String}],
    comment:{type: Number, default:0},
    pv: {type: Number, default:0},
    tab:{type:String},
    type: String
});

ItemSchema.index({_id: 1, create_at: 1});

module.exports = mongoose.model('Item', ItemSchema);
