var express = require('express');
var app = express();



app.get('/', function(req, res){
    console.log("主页get");
    res.send("hello get")
});

app.post('/', function(req, res){
    console.log("主页post");
    res.send("hello post")
});

app.get('/del_user', function(req, res){
    console.log('/del_user 响应 delete');
    res.send('删除页面')
});

app.get('/list_user', function(req, res){
    console.log('/list_user get')
    res.send('用户列表')
})

app.get('/ab*cd', function(req, res){
    console.log('/ab*cd get请求')  
    res.send('正则匹配')
})

var server = app.listen(8081, 'localhost', function(){

    var host = server.address().address;
    var port = server.address().port;

    console.log("访问地址为 http://%s:%s", host, port);
})