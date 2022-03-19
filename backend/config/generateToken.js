const jwt = require("jsonwebtoken");

// using json web token to generate token for the user
 const generateToken =  (id) => {
     return jwt.sign({id} , process.env.JWT_KEY , {expiresIn : '30d'})
 }

 module.exports = generateToken ;