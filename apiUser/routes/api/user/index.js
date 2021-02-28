const router = require('express').Router()
const controller = require('./controller');
const multer = require('multer');
const passport = require('passport');
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
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/list'}));
module.exports = router