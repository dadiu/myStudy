var fs = require('fs');
var data = 'write there';

// 写入数据
console.log("---------- 写入数据 ----------");

var writerStream = fs.createWriteStream('write.txt');


writerStream.write(data, 'UTF8');
writerStream.end();


// 处理流事件 --> data, end, and error
writerStream
    .on('finish', function(){
        console.log('this is finish');
    })
    .on('error', function(err){
        console.log(err.stack);
    })

    console.log("app is over");
