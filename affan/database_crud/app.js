const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bookstore = require("./model/bookstore")
const path = require('path')

const app=express();
mongoose.connect('mongodb://localhost:27017/bookstoreSamp');
app.use(express.static('public'));

app.set('views engine',"ejs")
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

 var bookData ;

app.post("/",async function(req,res){

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

// app.post("/library" ,async (req,res)=>{
//     res.render('gproduct_card.ejs',{books:bookData})
// })
app.post("/create",async (req,res)=>{
    //console.log(req.body);
    const newBook= Bookstore(req.body);
    await newBook.save();
})

app.post("/contactUs",async (req,res)=>{
    console.log(req.body);
})

app.listen(3000,function(){
    console.log("server started at 3000");
})