var express = require('express');
var app = express();

app.get('/', function(req, res){

    res.send('Hello Word');

})

var server = app.listen(8000, 'localhost', function(){
    
    console.log(server.address());

    var host = server.address().address;
    var port = server.address().port;

    console.log("访问地址为 http://%s:%s", host, port);
    
})