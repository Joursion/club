/**
 * Created by m on 16-2-18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ActivitySchema = new Schema({
    title: {type: String, required: true,},
    creator: {type: String},
    create_at: {type: Date, default: Date.now()},
    //update_at: {type: Date, default: Date.now()},
    //activity_date: {type: String},
    start: Date,
    end: Date,
    img: [String],
    // deadline: {type: String, required: true, default:"待定"},
    // content: {type: String, required: true, default: "待完善"},
    // number_limit: {type: String, required: true, default:"待定"},
    content:{String},
    join: {type: Number, required: true, default: 0},
    pv: {type: Number, default: 0},
    comment: {type: Number, default: 0},
    finish: {type: Boolean, default: false},
    top: {type: Boolean, default: false},
    type: String
});

ActivitySchema.index({update_date:1});

module.exports = mongoose.model('Activity', ActivitySchema);


// {
//     "title" : "东钱湖烧烤",
//     "end": ISODate(2016-11-15T15:07:41.102Z),
//     "start": ISODate(2016-11-14T15:07:41.102Z),
//     "top": true,
//     "comment": 2,
//     "pv": 100,
//     "join": 0,
//     "img": ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQT7UPFlVkKP3F3vyWqzhr8XIwabU-AfU0_IWxREGbzYs6Y7x9V','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKQTFRY34y9tGyxERQaL_bw_lpkNpaNlLzscQG_jMGFzmeWuvPrw'],
//     "create_at":ISODate("2016-11-14T16:02:12.426Z"),
// }