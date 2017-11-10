
// __filename 表示当前正在执行的脚本的文件名。
console.log('__filename : ' + __filename)

//__dirname 表示当前执行脚本所在的目录。
console.log('__dirname : ' + __dirname)

console.log("--------------------------")




// console.log的用法
console.log("程序开始执行console");
var counter = 10;
console.log("计数 ： %d", counter);

// 输出时间，表示计时开始。
console.time("获取数据");
// 结束时间，表示计时结束。
console.timeEnd("获取数据");

console.log("程序执行完毕")

console.log("--------------------------")



// process
console.log("程序开始执行process");
// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());