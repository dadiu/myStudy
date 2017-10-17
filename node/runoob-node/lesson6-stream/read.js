var fs = require('fs');
var data = '';


// 读取数据
console.log("---------- 读取数据 ----------");

var readerStream = fs.createReadStream('read.txt');
readerStream.setEncoding('UTF8');


// 处理流事件 --> data, end, and error
readerStream
    .on('data', function (chunk) {
        data += chunk;
    })
    .on('end', function(){
        console.log(data);
    })
    .on('error', function(err){
        console.log(err.stack);
    });

    console.log("game over");