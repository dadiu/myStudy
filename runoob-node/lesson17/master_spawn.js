// child_process.spawn 使用指定的命令行参数创建新进程

// const fs = require('fs');
const child_process = require('child_process');

let i = 0;
for(; i < 3; i++){

    var workerProcess = child_process.spawn('node', ['support.js', i]);

    workerProcess.stdout.on('data', function(data){
        console.log('stdout : ' + data);
    })

    workerProcess.stderr.on('data', function(data){
        console.log('stderr : ' + data);
    })

    workerProcess.on('close', function(code){
        console.log('子进程已退出， 退出码 ' + code);
    })
}
