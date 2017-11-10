var fs = require('fs');

// 读写一体 管道流操作实例
console.log("---------- 读写一体  管道流操作实例 ----------");

var readerStream = fs.createReadStream('read.txt');
var writerStream = fs.createWriteStream('toggle.txt');

readerStream.pipe(writerStream);

console.log('toggle is over')