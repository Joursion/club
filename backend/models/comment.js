/**
 * Created by m on 16-2-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    id: {type: String, required: true},
    username: {type: String, required: true},
    content: {type: String, required: true},
    create_at: {type: Date, default: Date.now()},
    reply: [
        {
            content: {type: String},
            to: {type: String},
            from: {type: String}
        }
    ]
});

CommentSchema.index({_id: 1, update_at: 1});

module.exports = mongoose.model('Comment',CommentSchema);