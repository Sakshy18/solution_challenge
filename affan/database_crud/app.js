const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bookstore = require("./model/bookstore")

const app=express();
mongoose.connect('mongodb://localhost:27017/bookstoreSamp');

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req,res){
    res.sendFile(__dirname + "/cover.html");
})

app.get("/create",(req,res)=>{
    res.sendFile(__dirname + "/create.html");
})

app.post("/",async function(req,res){
    let searchQuery=req.body.searchInput;
    const bookData = await Bookstore.find({ name: searchQuery});
    console.log(bookData);
})

app.post("/create",async (req,res)=>{
    console.log(req.body);
    const newBook= Bookstore(req.body);
    await newBook.save();
})

app.listen(3000,function(){
    console.log("server started at 3000");
})