const express = require("express");
const dotenv = require('dotenv');
const fs = require('fs');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const { notFound , errorHandler } = require("./middleware/errorMiddleware")
const messageroutes = require('./routes/messageRoutes')

// defining new express api
const app = express();
dotenv.config();
// to connect to the database
connectDB();
// to accept json data
app.use(express.json());
// running all schema files before routes 
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})
// basic routes
app.get('/',(req,res)=>res.send('API IS RUNNING'));
app.use('/api/user' , userRoutes) 
app.use("/api/chat", chatRoutes);
app.use("/api/message" , messageroutes)
// to handle middleware
app.use(notFound);
app.use(errorHandler);
// connecting api to server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`starting server in port ${PORT}`))