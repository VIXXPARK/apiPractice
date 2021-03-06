const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var GoogleStrategy = require('passport-google-oauth20')
var config = require('./config');
var session = require('express-session');
var flash = require('connect-flash');
var FacebookStrategy = require('passport-facebook');
var NaverStrategy = require('passport-naver');
var KakaoStrategy = require('passport-kakao').Strategy;
let bcrypt = require('bcrypt')
exports.local = passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
    },
    function(req,username,password,done){
        console.log(username)
        User.findOne({email:username},(error,user)=>{
            console.log(user)
            if(error) return done(error)
            if(!user) return done(null,false,{message:"invalid id"})
            let passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            )
            if(!passwordIsValid){
                return done(error,user)
            }
            else
                return done(null,user)
        })
}));
passport.serializeUser(function (user,done){
    done(null,user)
});
passport.deserializeUser(function(obj,done){
    done(null,obj);
});

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,{expiresIn:3600});
};

var opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log('JWT payload: ',jwt_payload);
    User.findOne({email:jwt_payload.email},(err,user)=>{
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


exports.GoogleStrategy = passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/user/google/callback',
    passReqToCallback:true
    },
    function(request, accessToken, refreshToken, profile, done){
        console.log('profile: ', profile);
        var user = profile;
    
        done(null, user);
      }
))

exports.FacebookStrategy = passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret: config.FACEBOOK_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/user/facebook/callback',
    passReqToCallback:true  
    },
    function(request,accessToken,refreshToken,profile,done){
        var user = profile
        done(null,user)
    }
))

exports.NaverStrategy = passport.use(new NaverStrategy({
    clientID:config.NAVER_CLIENT_ID,
    clientSecret:config.NAVER_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/user/naver/callback',
    passReqToCallback:true
    },
    function(request,accessToken,refreshToken,profile,done){
        var user = profile
        done(null,user)
    }
))

exports.KakaoStrategy = passport.use(new KakaoStrategy({
    clientID:config.KAKAO_CLIENT_ID,
    callbackURL:'http://localhost:3000/api/user/kakao/callback'
    },
    function(accessToken,refreshToken,profile,done){
        console.log(accessToken)
        var user = profile
        done(null,user)
    }
))