/**
 * sender
 * content
 * chat
 */

const mongoose = require('mongoose');

// defining schema
const messageModelSchema = mongoose.Schema(
    {
        sender : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
        content : {type : String  , trim : true},
        chat : { type : mongoose.Schema.Types.ObjectId , ref : 'Chat'},
    },
    {
        timestames : true ,
    }
)

const Message = mongoose.model('Message' , messageModelSchema);

module.exports = Message ;