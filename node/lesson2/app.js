var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req,res){
    var q = req.query.q;
    var md5Value = utility.md5(q);
    res.send(md5Value);
})

app.listen(3000, function(req, res){
    console.log('app is running at port 3000');
    console.log('必须带参数q，否则会报错，可访问这个地址：http://localhost:3000/?q=alsotang');
})