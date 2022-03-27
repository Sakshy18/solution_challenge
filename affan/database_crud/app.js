const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bookstore = require("./model/bookstore")
const path = require('path');
const { profile } = require("console");
const axios = require('axios')
const app=express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


mongoose.connect('mongodb://localhost:27017/bookstoreSamp');
app.use(express.static('public'));

app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'/views'))

app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static('public'));

app.get("/",  (req,res) =>{
    res.sendFile(__dirname + "/pages/home.html")
})

app.get("/search", (req,res) =>{
    res.sendFile(__dirname + "/pages/cover.html");
})

app.get("/create",(req,res)=>{
    res.sendFile(__dirname + "/pages/form.html");
})

app.get("/contactUs",(req,res)=>{
    res.sendFile(__dirname + "/pages/contact_us.html")
})

app.get('/signIn', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
  });

app.get("/learn",(req,res)=>{
    res.sendFile(__dirname + "/pages/aboutus.html")
})
  
app.get('/chat', function(req, res) {
    res.render('index.ejs');
});


//CHAT CODE
app.post
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});





app.post('/login', (req, res) => {
    // Insert Login Code Here
    let loginCred = req.body;
    res.render('profile.ejs',{profileId:loginCred});
});


 var bookData ;

app.post("/search",async function(req,res){

    let searchQuery=req.body.searchInput;
    
    if(searchQuery === ''){
        bookData = await Bookstore.find({ });
        res.render('bookpage.ejs',{books:bookData});
    }else{
        bookData = await Bookstore.find({ name:searchQuery });
        res.render('bookpage.ejs',{books:bookData});
    }
    //res.render('gproduct_card.ejs',{books:bookData});
})


// app.get('/books',async(req,res)=>{
//     res.render('bookpage.ejs',{books:bookData})
// })


var profileId;
app.get("/profile" ,async (req,res)=>{
    
    res.render('profile.ejs',{id:profileId});
})

app.post("/create",async (req,res)=>{
    //console.log(req.body);
    const newBook= Bookstore(req.body);
    await newBook.save();
})

app.post("/contactUs",async (req,res)=>{
    console.log(req.body);
})

http.listen(process.env.PORT || 3000,function(){
    console.log("server started at 3000");
})