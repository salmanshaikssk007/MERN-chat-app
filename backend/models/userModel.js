
/**
 * name
 * email
 * password
 * pic
 */
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

// designing user scheme
const userModalScheme =  mongoose.Schema(
    {
        name : { type : String , required : true},
        email : { type : String , required : true , unique : true },
        password : { type : String , required : true },
        pic : { type : String , default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",}
    },
    {
        timestamps : true 
    }
)
// designing custom method to matchpassword
userModalScheme.methods.matchPasswords = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}
// to encrpt the password
userModalScheme.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User" , userModalScheme );

module.exports = User ;