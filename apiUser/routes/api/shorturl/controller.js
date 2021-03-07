const { response } = require('express')
const config = require('../../../config')

exports.geturl = (req,res)=>{
    console.log(req.query.url)
    var url  = "https://naveropenapi.apigw.ntruss.com/util/v1/shorturl?url="+encodeURI(req.query.url)
    var request = require('request')   
    var options={
        url:url,
        headers:{'X-NCP-APIGW-API-KEY-ID':config.NAVER_CLOUD_CLIENT_ID,'X-NCP-APIGW-API-KEY':config.NAVER_CLOUD_CLIENT_SECRET}
    }
    request.get(options,(status,response)=>{
        console.log(response.body)
        res.json({
            data:response.body
        })
    })
}