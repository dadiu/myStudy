/**
 * Node.js 创建第一个应用
 * http://www.runoob.com/nodejs/nodejs-http-server.html
 */

var http = require('http');

http.createServer(function(req,res){

    res.writeHead(200, {
        'Content-Type' : 'text/plain'
    });
    res.end('Hello World');

}).listen(8888);

console.log('Server running');