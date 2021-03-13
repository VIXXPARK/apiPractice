const config = require('../../../config')

exports.trend = (req,res,next)=>{
    let url = "https://naveropenapi.apigw.ntruss.com/datalab/v1/search"
    const request = require('request')
    const options= {
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
}