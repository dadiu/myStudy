var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index_get.html', function(req, res){

    res.sendFile(__dirname + '/' + 'index_get.html');

})

app.get('/process_get', function(req, res){
    
    var response = {
        "first_name" : req.query.first_name,
        "last_name" : req.query.last_name
    }

    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(8081, 'localhost', function(){

    console.log(server.address());

    var host = server.address().address;
    var port = server.address().port;

    console.log('访问地址： http://%s:%s', host, port);
})
