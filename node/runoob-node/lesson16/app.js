var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

// 创建 appliocation/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var app = express();


// 写入方法
function writeFun(data) {

    // 写入
    fs.writeFile(__dirname + '/' + 'users.json', data, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('add success!');
        }
    })

}

///////////////////////////////////////
// start 
app.get('/', function (req, res) {

    res.sendFile(__dirname + '/' + 'index.html');

})


// 获取列表
app.get('/listUsers', function (req, res) {

    fs.readFile(__dirname + '/' + 'users.json', 'utf-8', function (err, data) {

        console.log(data);
        res.end(data);
    })

})



// 添加
app.post('/addUser', urlencodedParser, function (req, res) {

    // 读取
    fs.readFile(__dirname + '/' + 'users.json', 'utf-8', function (err, data) {

        data = JSON.parse(data);
        data['user' + req.body.id] = req.body;
        data = JSON.stringify(data);
        console.log(data);

        res.end(data);
        // 写入
        writeFun(data);

    })

})



// 删除

app.post('/deleteUser', urlencodedParser, function (req, res) {

    var id = user + req.body.id;

    fs.readFile(__dirname + '/' + 'users.json', function (err, data) {

        let key;
        data = JSON.parse(data);
        for (key in data) {
            if (data[id]) {
                delete data[id];
                data = JSON.stringify(data);

                console.log(data);
                res.end(data);

                // 写入
                writeFun(data);

            } else {

                console.log("not found this key");
                return;
            }
        }

    })

})


// 获取单个


var server = app.listen(8081, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("http://%s:%s", host, port);
})