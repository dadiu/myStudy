
var http = require('http');
var fs = require('fs');

var request = require('request');	//方法3依赖  npm install request

http
	.createServer(function(req, res){

		// 方法1：readFile
		// fs.readFile('stream_copy.png', function(err, data){
		// 	if(err){
		// 		res.end('err');
		// 	} else{
		// 		res.writeHeader(200, {'Context-Type' : 'text/html'});
		// 		res.end(data);
		// 	}
		// })


		// 方法2：pipe
		// fs.createReadStream('stream_copy.png').pipe(res);

		// 方法3：request
		request('https://img.alicdn.com/bao/uploaded/i1/TB1qwwmOXXXXXbbapXXXXXXXXXX_!!0-item_pic.jpg_120x120.jpg')
			.pipe(res);

	})
	.listen(8080);