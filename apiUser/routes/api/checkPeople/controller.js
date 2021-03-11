const config = require('../../../config')
var request = require('request')

exports.getPeople = (req,res,next)=>{
    var api_url="https://api.bigdatahub.co.kr/v1/datahub/datasets/search.json"
    // var queryParams = '?' + encodeURIComponent('TDCAccessKey') + '='+encodeURIComponent(config.TDCAccessKey); 
    var queryParams='?'+encodeURIComponent('pid')+'='+encodeURIComponent(req.query.pid)
    // queryParams+='&'+encodeURIComponent('TDCAccessKey')+'='+encodeURIComponent(config.TDCAccessKey)
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
    var options={
        url:api_url,
        method:'GET',
        headers:{'TDCAccessKey':config.TDCAccessKey}
    }    
    request(options,(error,response,body)=>{
        console.log(options)
        console.log(response)
        console.log(body)
        res.json({
            data:response
        })
    })
}

exports.getAlarm = (req,res,next)=>{
    var api_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst"
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+(config.PublicKey); /* Service Key*/
    if(req.query.pageNo)
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(req.query.pageNo); /* */
    if(req.query.numOfRows)
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(req.query.numOfRows); /* */
    if(req.query.dataType)
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent(req.query.dataType); /* */
    if(req.query.base_date)
        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(req.query.base_date); /* */
    if(req.query.base_time)
        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(req.query.base_time); /* */
    if(req.query.nx)
        queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(req.query.nx); /* */
    if(req.query.ny)
        queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(req.query.ny); /* */
    console.log(api_url+queryParams)
    request({
        url: api_url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        //console.log('Reponse received', body);
        res.json({
            data:response
        })
    });
    
}

exports.getCovid = (req,res,next)=>{
    var api_url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+(config.PublicKey); /* Service Key*/
    if(req.query.pageNo)
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(req.query.pageNo); /* */
    if(req.query.numOfRows)
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(req.query.numOfRows); /* */
    if(req.query.startCreateDt)
        queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(req.query.startCreateDt); /* */
    if(req.query.endCreateDt)
        queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(req.query.endCreateDt); /* */
    
    api_url+=queryParams
    console.log(api_url)
    request({
        url: api_url,
        method: 'GET'
    }, function (error, response, body) {
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        //console.log('Reponse received', body);
        res.json({
            data:response
        })
    });
}

