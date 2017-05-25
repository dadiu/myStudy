
const fs = require('fs');
const xlsx = require('xlsx');
const Promise = require('bluebird');


// 读取execl
exports.readXlsxAsync = function(xpath){

    return  xlsx.readFile(xpath);

}


// 写入
exports.writeFileAsync = function(fpath, content){

    return new Promise(function(resolve, reject){
        fs.writeFile(fpath, content, function(err){

            if(err){
                reject(err)
            }
            else {
                resolve();
                console.log("write ok");
            }
        })
    })

}
