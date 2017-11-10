var http = require('http');
var querystring = require('querystring');

var postHtml = '<html>' +
    '<head><meta charest="utf-8"/><title>node post test</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名：<input type="text" name="name" /><br/>' +
    '网站url: <input type="text" name="url"/><br/>' +
    '<input type="submit" value="确定"/>' +
    '</form>' +
    '</body>' +
    '</html>';

http.createServer(function (req, res) {

    var body = '';

    req
        .on('data', function (chunk) {
            body += chunk;
        })
        .on('end', function(){
            // 解析参数
            body = querystring.parse(body);

            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});

            console.log(body);

            if(body.name && body.url){
                res.write("网站名：" + body.name + '<br/>');
                res.write("网站url : " + body.url);
                
            } else {
                res.write(postHtml);
            };

            res.end();
        })


}).listen(8888);