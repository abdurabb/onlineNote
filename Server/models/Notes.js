
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const notes = mongoose.Schema({


    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Notes", notes)