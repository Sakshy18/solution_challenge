const  mongoose  = require("mongoose")

const bookstoreSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        lowercase:true
    },
    authorName:{
        type:String,
        required: true
    },
    edition:{
        type : Number,
        required : true
    },
    price:{
        type : Number,
        required : true,
        min : 0
    },
    description :{
        type : String,
        required : true
    }
})

const Bookstore = mongoose.model("Bookstore", bookstoreSchema );

module.exports = Bookstore;
