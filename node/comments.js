/****
http.request(options[,callback])

host			服务器、域名、IP地址
hostname		host别名
port			远端服务器端口，默认80
localAddress	绑定local本地接口
socketPath		
method			指定http请求方法的字符串，默认是get
path 			请求的路径
headers 		包涵请求头的对象
auth			用户计算认证头的认证，一般是user后面跟着postword
agent			控制agent的行为，代理
keepAlive 		
keepAliveMsecs
****/

var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content':'hello word',
	'mid':8837
});



var options = {
	hostname : 'www.imooc.com',
	port : 80,
	path : '/course/docomment',
	method : 'post',
	headers : {
		'Accept' : 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding' : 'gzip, deflate',
		'Accept-Language' : 'zh-CN,zh;q=0.8',
		'Connection' : 'keep-alive',
		'Content-Length' : postData.length,
		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie' : '这个不能给，需要自己看教程去拿 -2- ',
		'Host' : 'www.imooc.com',
		'Origin' : 'http://www.imooc.com',
		'Referer' : 'http://www.imooc.com/video/8837',
		'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
		'X-Requested-With' : 'XMLHttpRequest'
	}
}

var req = http.request(options, function(res){
	console.log('Status : ' + res.statusCode);
	console.log('headers : ' + JSON.stringify(res.headers));

	res.on('data', function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on('end', function(){
		console.log('comment end');
	});

	res.on('error', function(e){
		console.log('Error : ' + e.message);
	});
});

req.write(postData);
req.end();
