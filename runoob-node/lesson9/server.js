var http = require('http');
var url = require("url");

function start(route){

    function onRequest(req, res){

        var pathname = url.parse(req.url).pathname;
        console.log('pathname : ' + pathname);

        route(pathname);

        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.write('hello route');
        res.end();

    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
};

exports.start = start;

// 为什么pathname的console会运行2次？？