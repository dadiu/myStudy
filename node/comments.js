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
		'Cookie' : 'imooc_uuid=bd5c23b7-9430-444b-95d7-abe38ab2daa0; imooc_isnew_ct=1476163826; loginstate=1; apsid=dmYWVkNDM3MDY2YTg0MzljZjA0OWZlYmYzZmQ2ZTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTYyMjEyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NTE0MDQzNzBAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGY1ZDgwMzVmNDljZmNmOGMzMjM4ODhjNjQ2NWE3YWM1%2BR4pWPkeKVg%3DOT; last_login_username=451404370%40qq.com; PHPSESSID=u1bph9gn4j3fvt3kqfsbse20p6; jwplayer.qualityLabel=é«æ¸; jwplayer.volume=86; imooc_isnew=2; cvde=582d0a3bc89c3-40; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1478136956,1479089800,1479267142,1479346713; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1479364933',
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