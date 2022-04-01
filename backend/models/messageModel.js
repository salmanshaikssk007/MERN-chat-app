/**
 * sender
 * content
 * chat
 * readBy
 */

const mongoose = require('mongoose');

// defining schema
const messageModelSchema = mongoose.Schema(
    {
        sender : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
        content : {type : String  , trim : true},
        chat : { type : mongoose.Schema.Types.ObjectId , ref : 'Chat'},
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    {
        timestames : true ,
    }
)

const Message = mongoose.model('Message' , messageModelSchema);

module.exports = Message ;