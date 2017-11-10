/**
 * 解压文件
 */

var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('read.txt.gz')
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream('decompress.txt'));

console.log("解压成功")