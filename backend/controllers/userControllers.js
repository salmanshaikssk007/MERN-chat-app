const asyncHandler = require('express-async-handler');
const generateToken = require('./../config/generateToken');
const User = require('./../models/userModel')

/**
 * Here while defining routes takes register user to get data frontend and use api toconnect with server
 */
// to send data to register

const registerUser = asyncHandler(async(req,res) =>{
    const { name, email, password, pic } = req.body ;

    if(!name || !email || !password ){
        res.status(400) ;
        throw new Error("please Enter all the fields")
    }
    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400) ;
        throw new Error("User Already Exists");
    }

    const user = User.create({
        name ,
        email ,
        password ,
        pic
    })

    if(user){
        res.status(201).json(
            {
                _id : user._id ,
                name : user.name ,
                email : user.email,
                password : user.password ,
                pic : user.pic ,
                token : generateToken(user._id)
            }
        );
    }else{
         res.status(400);
         throw new Error(" Failed to create user ");
    }
})

// authentication functionality for login

const authUser = asyncHandler(async (req,res)=>{

    const { email , password } = req.body ;

    if(!email || !password ){
        res.status(400);
        throw new Error("Enter the credentials");
    }
    const user = await User.findOne({email});
   
    if (user && (await user.matchPasswords(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
})

module.exports = {
    registerUser ,
    authUser
} ;