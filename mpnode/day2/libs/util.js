'use strict'

var fs = require('fs');
var Promise = require('bluebird');


// 读取文件
exports.readFileAsync = function(fpath, encoding){

    return new Promise(function(resolve, reject){
        fs.readFile(fpath, encoding, function(err, content){
            // console.log("err : " + JSON.stringify(err));
            if(err){
                reject(err);
            }
            else {

                // console.log("content : " + JSON.stringify(content));
                resolve(content);   
            }
        })
    })
}


// 写入文件
exports.writeFileAsync = function(fpath, content){
    return new Promise(function(resolve, reject){
        fs.writeFile(fpath, content, function(err){
            if(err){
                reject(err);
            }
            else {
                resolve();
            }
        })
    })
}