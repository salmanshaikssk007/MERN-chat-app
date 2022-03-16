
/**
 * name
 * email
 * password
 * pic
 */
const { default: mongoose } = require("mongoose");

// designing user scheme
const userModalScheme =  mongoose.Schema(
    {
        name : { type : String , required : true},
        email : { type : String , required : true },
        password : { type : String , required : true },
        pic : { type : String , required : true , default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",}
    },
    {
        timestamps : true 
    }
)

const User = mongoose.model("User" , userModalScheme );

module.exports = User ;