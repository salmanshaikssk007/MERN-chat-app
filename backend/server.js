const express = require("express");
const { chats } = require("./data/data");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const { notFound , errorHandler } = require("./middleware/errorMiddleware")

// defining new express api
const app = express();
dotenv.config();
// to connect to the database
connectDB();
// to accept json data
app.use(express.json());

// basic routes
app.get('/',(req,res)=>res.send('API IS RUNNING'));
app.use('/api/user' , userRoutes) 
// to handle middleware
app.use(notFound);
app.use(errorHandler);
// connecting api to server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`starting server in port ${PORT}`))