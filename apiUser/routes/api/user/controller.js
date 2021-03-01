const User = require('../../../models/user');
const passport = require('passport');
const { authenticate } = require('passport');

exports.getUser=(req,res,next)=>{
    User.find({})
    .then((users)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(users);
    },(err)=>next(err))
    .catch((err)=>next(err));
}

exports.signup = (req,res,next)=>{
    console.log(req.files['profile'][0])
    User.register(new User({email: req.body.email}),
    req.body.password,(err,user)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({err:err});
        }
        else{
            if(req.body.firstname){
                user.firstname = req.body.firstname;
            }
            if(req.body.lastname){
                user.lastname = req.body.lastname;
            }
            
            user.profile=req.files['profile'][0].path
            user.save((err,user)=>{
                if(!err){
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:true,data:user});
                }
            });
        };
    }
    )
}
