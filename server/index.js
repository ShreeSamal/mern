const express = require('express');
const app = express();
const http = require("http")
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Message = require('./models/message.model')
const jwt = require('jsonwebtoken');

const { createServer } = require("http");
const { Server } = require("socket.io");

app.use(cors())
app.use(express.json())

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});



io.on("connection",(socket)=>{
    console.log(socket.id)
})

//user--shree  pass--samal12
mongoose.connect('mongodb+srv://shree:samal12@cluster0.gxvy5.mongodb.net/?retryWrites=true&w=majority')


app.get('/api/register',(req,res)=>{
    res.send('hiii');
})

app.post('/api/register',async (req,res) => {
    console.log(req.body);
    try{
        const user = await User.create(req.body)
        res.json({ status : 'ok'})
    }catch(err){
        res.json({status: 'error',error: 'Duplicate email'})
    }
});

app.post('/api/message',async (req,res) => {
    console.log(req.body);
    try{
        const message = await Message.create(req.body)
        res.json({message:'message created'})
    }catch(err){
        console.log(err);
    }
});

app.get('/api/message',async (req,res) => {
    console.log(req.body);
    try{
        const messages = await Message.find().sort({createdAt: -1})
        console.log(messages)
        res.json({messages: messages})
    }catch(err){
        console.log(err);
    }
});

app.post('/api/login',async (req,res) => {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if(user){
            const token = jwt.sign({
                name: user.name,
                email: user.email
            },'secret123')
            return res.status(200).json({status:'ok',user:token})
        }
        else{
            return res.status(300).json({status:'error',user:null})
        }
});

httpServer.listen(8000,()=>{
    console.log('server started..');
})