const mongoose = require("mongoose")
const { type } = require("os")
const { error } = require("console")
const userschema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    phone:{
        type:String,
        required:true
    },
    schlno:{
        type : String,
        required : true
    },
    section:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
},{timestamps : true})
const UUser = mongoose.model("user",userschema)
module.exports = UUser