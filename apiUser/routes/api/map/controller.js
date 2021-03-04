const config = require('../../../config')

exports.getmap = (req,res)=>{
    var api_url = "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=300&h=300&center=127.141755,37.318835"
    var request = require('request')
    var options={
        url:api_url,
        headers:{'X-NCP-APIGW-API-KEY-ID':config.NAVER_CLOUD_CLIENT_ID,'X-NCP-APIGW-API-KEY':config.NAVER_CLOUD_CLIENT_SECRET}
    }
    request.get(options,function(err,response,body){
        if(!err&&response.statusCode===200){
            res.json(body)
        }else{
            res.status(response.statusCode).end();
            console.log('err = '+response.statusCode)
        }
    })
}