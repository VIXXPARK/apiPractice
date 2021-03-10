const config = require('../../../config')
var http = require('http')
exports.getPeople = (req,res,next)=>{
    var api_url="https://api.bigdatahub.co.kr/v1/datahub/datasets/search.json"
    // var queryParams = '?' + encodeURIComponent('TDCAccessKey') + '='+encodeURIComponent(config.TDCAccessKey); 
    var queryParams='?'+encodeURIComponent('pid')+'='+encodeURI(req.query.pid)
    queryParams+='&'+encodeURIComponent('TDCAccessKey')+'='+encodeURIComponent(config.TDCAccessKey)
    if (req.query.page)
        queryParams+='&$'+encodeURIComponent('page')+'='+encodeURI(req.query.page)
    if (req.query.count)
        queryParams+='&$'+encodeURIComponent('count')+'='+encodeURIComponent(req.query.count)
    if (req.query.select)
        queryParams+='&$'+encodeURIComponent('select')+'='+encodeURI(req.query.select)
    if (req.query.where)
        queryParams+='&$'+encodeURIComponent('where')+'='+encodeURI(req.query.where)
    if (req.query.order)
        queryParams+='&$'+encodeURIComponent('order')+'='+encodeURI(req.query.order)
    api_url+=queryParams
    console.log(api_url)
    var options={
        url:api_url,
    }
    console.log(api_url)
    var request = require('request')
    request.get(options,(status,response)=>{
        res.json({
            data:response
        })
    })
}