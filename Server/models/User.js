
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const user = mongoose.Schema({

   
    first_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    } 
})

module.exports= mongoose.model("User",user)