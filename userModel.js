const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name:{
        type:String,
        max:255
    },
    email:{
        type:String,
        max:255,
        unique:true
    },
    visited:{
        type:Number
    }
},
{timestamps:true}
)

module.exports = mongoose.model("User", User)