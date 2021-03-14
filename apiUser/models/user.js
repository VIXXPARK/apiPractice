const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bycrypt = require('bcrypt')
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    profile:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
});




module.exports = mongoose.model('User',User);