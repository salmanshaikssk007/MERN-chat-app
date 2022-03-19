/**
 * chatName
 * isGroupChat
 * users
 * latestMessages
 * groupAdmin
 */

 const mongoose = require('mongoose');

//  strucutre of chatModule schema
const chatModuleSchema = new mongoose.Schema(
    {
        chatName : {
            type : String ,
            trim : true 
        },
        isGroupChat : {
            type : Boolean ,
            default : false 
        },
        users : [{
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Users'
        }],
        latestMessage : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Message'
        },
        groupAdmin : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'User'
        }
    },{
        timestamps : true 
    }
)

const Chat = mongoose.model('chat' , chatModuleSchema);

module.exports = Chat ;