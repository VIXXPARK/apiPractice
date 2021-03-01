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


User.statics.isValidUserPassword = function(username, password, done) {
    var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
    this.findOne(criteria, function(err, user){
        if(err) return done(err);
        if(!user){
            return done(null,false,{message:"incorrect user"});
        }
        return done(null,user);
    });
};

module.exports = mongoose.model('User',User);