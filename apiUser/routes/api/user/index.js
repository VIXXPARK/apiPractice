const router = require('express').Router()
const controller = require('./controller');
const multer = require('multer');
const passport = require('passport');
const authenticate = require('../../../passport');
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'public/images');
        }
    }),
    dest:'public/images'
});


router.get('/list',controller.getUser);
router.post('/signup',upload.fields([{name:'profile',maxCount:1}]),controller.signup);
router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{successRedirect:'/',failureRedirect:'/login',failureFlash:true}),function(req,res){
    res.redirect('/api/user/login')
});
router.get('/facebook',passport.authenticate('facebook',{scope:['public_profile','email']}));
router.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/login',successRedirect:'/'}),(req,res)=>{
    res.redirect('/api/user/login')
})
router.get('/naver',passport.authenticate('naver'));
router.get('/naver/callback',passport.authenticate('naver',{successRedirect:'/',failureRedirect:'/login',failureFlash:true}),function(req,res){
    res.redirect('/api/user/login')
})
router.get('/kakao',passport.authenticate('kakao'));
router.get('/kakao/callback',passport.authenticate('kakao',{successRedirect:'/',failureRedirect:'/login',failureFlash:true}),(req,res)=>{
    res.redirect('/api/user/login')
})

router.post('/login',passport.authenticate('local'),controller.login)
router.get('/logout',controller.logout)
module.exports = router