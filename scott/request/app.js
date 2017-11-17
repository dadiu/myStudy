var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content': '谢谢老师',
    'cid': 348
});

var options = {
    hostname: 'www.imooc.com',
    port: 80,
    path: '/course/docomment',
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid=961b35d5-cf7f-48c5-9ddc-b16916dc246d; imooc_isnew_ct=1497244212; PHPSESSID=q7hg5mdu20gmm4h5dp19slfmo3; loginstate=1; apsid=dmYWVkNDM3MDY2YTg0MzljZjA0OWZlYmYzZmQ2ZTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTYyMjEyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NTE0MDQzNzBAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGExYThjMTY2MGM0YjVlNTBiZWVhYTdmZDBlNTkxMmUy31cJWt9XCVo%3DOT; last_login_username=451404370%40qq.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1510212883,1510561755; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1510573554; imooc_isnew=2; cvde=5a0957d5b9de7-231',
        'Host': 'www.imooc.com',
        'Origin': 'http://www.imooc.com',
        'Referer': 'http://www.imooc.com/comment/348',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

var req = http.request(options, function(res){
    console.log('Status :' + res.statusCode);
    console.log('headers : ' +  JSON.stringify(res.headers));
    
    res.on('data', function(chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    })

    res.on('end', function(){
        console.log("评论完毕");
    })

})

req.on('error', function(e){
    console.log('Error : ' + e.message);
})
req.write(postData);
req.end();


// Accept:application/json, text/javascript, */*; q=0.01
// Accept-Encoding:gzip, deflate
// Accept-Language:zh-CN,zh;q=0.8
// Connection:keep-alive
// Content-Length:79
// Content-Type:application/x-www-form-urlencoded; charset=UTF-8
// Cookie:imooc_uuid=961b35d5-cf7f-48c5-9ddc-b16916dc246d; imooc_isnew_ct=1497244212; PHPSESSID=q7hg5mdu20gmm4h5dp19slfmo3; loginstate=1; apsid=dmYWVkNDM3MDY2YTg0MzljZjA0OWZlYmYzZmQ2ZTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTYyMjEyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NTE0MDQzNzBAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGExYThjMTY2MGM0YjVlNTBiZWVhYTdmZDBlNTkxMmUy31cJWt9XCVo%3DOT; last_login_username=451404370%40qq.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1510212883,1510561755; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1510573554; imooc_isnew=2; cvde=5a0957d5b9de7-231
// Host:www.imooc.com
// Origin:http://www.imooc.com
// Referer:http://www.imooc.com/comment/348
// User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36
// X-Requested-With:XMLHttpRequest