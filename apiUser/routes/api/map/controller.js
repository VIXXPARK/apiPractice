const config = require('../../../config')

exports.getmap = (req,res)=>{
    let api_url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query="+encodeURI(req.query.query)
    const request = require('request')
    const options={
        url:api_url,
        headers:{'X-NCP-APIGW-API-KEY-ID':config.NAVER_CLOUD_CLIENT_ID,'X-NCP-APIGW-API-KEY':config.NAVER_CLOUD_CLIENT_SECRET}
    }
    request.get(options,(status,response)=>{
        res.json({
            data:response.body
        })
    })
}