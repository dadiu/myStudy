/**
 * Node.js 回调函数
 * http://www.runoob.com/nodejs/nodejs-callback.html
 */

 var fs = require('fs');


// 阻塞代码实例
// var data = fs.readFileSync('input.txt');

// console.log(data.toString());
// console.log("程序执行结束！");


// 非阻塞代码实例


fs.readFile('input.txt', function(err, data){

    if(err){
        return console.log('error');
    };

    console.log(data.toString());
});

console.log("程序执行结束！");