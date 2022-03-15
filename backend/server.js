const express = require("express");
const { chats } = require("./data/data");
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/',(req,res)=>res.send('API IS RUNNING'));
app.get('/api/chats' , (req,res)=>res.send(chats));
app.get('/api/chats/:id' , (req,res)=>{
    const singleChat = chats.find(chat=>chat._id === req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`starting server in port ${PORT}`))