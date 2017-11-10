// child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。

// const fs = require('fs');
const child_process = require('child_process');

let i = 0;
for(; i < 3; i++){
    
    // child_process.exec(command[, options], callback)
    // 执行 node support.js 再回调
    var workerProcess = child_process.exec('node support.js ' + i, function(error, stdout, stderr ){

        if(error){
            console.log(error.stack);
            console.log('Error code :' + error.signal);
            console.log('Signal recevied :' + error.signal);
        }

        console.log('stdout ' +  stdout);
        console.log('stderr ' + stderr);
    })

    workerProcess.on('exit', function(code){
        console.log('子进程已退出， 退出码 ' + code);
    })
}