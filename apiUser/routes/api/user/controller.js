const User = require('../../../models/user');
const passport = require('passport');
const authenticate = require('../../../passport');
const bcrypt = require('bcrypt');
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
    console.log(req.files['profile'][0].path)
    const profile=req.files['profile'][0].path
    const encryptedPassword = bcrypt.hashSync(req.body.password,10)
    User.create({
        email:req.body.email,
        password:encryptedPassword,
        nickname:req.body.nickname,
        profile:profile
    })
    .then(result=>{
        res.json({
            success:true,
            result
        })
    })
}
exports.login=(req,res)=>{
    let token = authenticate.getToken({email:req.body.email})
    res.json({
        data:req.user,
        token:token
    })
}

exports.logout=(req,res,next)=>{
    req.logout();
    console.log(req.session)
    res.redirect('/');
}