/**
 * Node.js 文件系统
 * http://www.runoob.com/nodejs/nodejs-fs.html
 */

 
var fs = require('fs');


// console.log('-- 读取实例 --');

// 异步
// fs.readFile('input.txt', function(err, data){
//     if(err){
//         return  console.error(err);
//     }
//     console.log('异步读取结束');
//     console.log(data.toString());
// })


// 同步
// var data = fs.readFileSync('input.txt');
// console.log("同步读取结束")
// console.log(data.toString())

// console.log("-- the end --")




console.log('-- 写入 --');
fs.writeFile('input.txt', '我是通过写入的文件内容', function(err){
    if(err){
        return console.error(err);
    };

    console.log("写入成功");
    console.log("读取写入的内容");

    fs.readFile('input.txt', function(err, data){
        if(err){
            return console.error(err);
        }
        console.log("写入成功");
        console.log(data.toString());
    })
})
