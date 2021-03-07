#네이버,구글,카카오 등의 API사용

구글, 페이스북, 네이버 OAUTH를 통한 로그인
```javascript
exports.CompanyStrategy = passport.use(new CompanyStrategy({
    clientID: config.COMPANY_CLIENT_ID,
    clientSecret: config.COMPANY_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/user/company/callback',
    passReqToCallback:true  
    },
    function(request,accessToken,refreshToken,profile,done){
        User.findOne({_id:profile.id},(err,user)=>{
            if(user){
                return done(err,user);
            }
            const newUser = new User({
                email:profile.email
            })
            newUser.save((user)=>{
                return done(null,user)
            })
        }) 
    }
))

```

```javascript
router.get('/company',passport.authenticate('company'));
router.get('/company/callback',passport.authenticate('company',{successRedirect:'/',failureRedirect:'/login',failureFlash:true}),function(req,res){
    res.redirect('/')
})

```

네이버 geocoding을 통한 해당 장소 정보 가져오기

```javascript

exports.getmap = (req,res)=>{
    console.log(req.query.query)
    var api_url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query="+encodeURI(req.query.query)
    var request = require('request')
    var options={
        url:api_url,
        headers:{'X-NCP-APIGW-API-KEY-ID':config.NAVER_CLOUD_CLIENT_ID,'X-NCP-APIGW-API-KEY':config.NAVER_CLOUD_CLIENT_SECRET}
    }
    request.get(options,(status,response)=>{
        res.json({
            data:response.body
        })
    })
}
```

네이버 search data 가져오기

```javascript
exports.trend = (req,res,next)=>{
    var url = "https://naveropenapi.apigw.ntruss.com/datalab/v1/search"
    var request = require('request')
    var options= {
        url:url,
        method:'POST',
        body:JSON.stringify(req.body),
        headers:{'X-NCP-APIGW-API-KEY-ID':config.NAVER_CLOUD_CLIENT_ID,'X-NCP-APIGW-API-KEY':config.NAVER_CLOUD_CLIENT_SECRET}
    }
    request.post(options,(status,response)=>{
        console.log(response)
        res.json({
            data:response.body
        })
    })
```
JSON.stringify()라는 메소드가 있다는 것을 알았다.

<img src="/image/api_search_trend.png">