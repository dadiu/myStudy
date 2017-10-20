var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 appliocation/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended : false});

app.use(express.static('public'));

app.get('/index_post.html', function(req, res){

    res.sendFile(__dirname + '/' + 'index_post.html');

})

app.post('/process_post', urlencodedParser, function(req, res){
    
    var response = {
        "first_name" : req.body.first_name,
        "last_name" : req.body.last_name
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
