/**
 * 压缩文件
 */

 var fs = require('fs');
 var zlib = require('zlib');

 fs.createReadStream('read.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('read.txt.gz'));

console.log("压缩完成")