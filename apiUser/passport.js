const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true

},
function(req,username,password,done){
    User.findOne({email:username,function (err,user) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false,{message:"incorrect user"});
        }
        if(!user.comparePassword(password)){
            return done(null,false,{message:'Incorrect password'});
        }
        return done(null,user);
        
    }})
}
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,{expiresIn:3600});
};

var opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log('JWT payload: ',jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            return done(err,false);
        }
        else if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt',{session:false});
