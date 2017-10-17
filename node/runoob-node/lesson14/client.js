
// web客户端

var http = require('http');

var options = {
    host: 'localhost',
    port: '8888',
    path: '/index.html'
};

var callback = function (res) {

    var body = "";

    res
        .on('data', function (chunk) {
            body += chunk;
        })
        .on('end', function () {
            console.log(body);
        })
};

var req = http.request(options, callback);
req.end();

// 需要开始node server 再开启 client 