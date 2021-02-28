const mongoose = require('mongoose')
const Schema = mongoose.Schema
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
    }

},{
    timestamps:true
});

User.plugin(passportLocalMongoose,{usernameField:'email'});


User.methods.comparePassword= function(inputPassword,cb){
    if(inputPassword===this.password){
        cb(null,true);
    }else{
        cb('error');
    }
}

module.exports = mongoose.model('User',User);