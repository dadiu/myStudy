'use strict'

var Koa = require('koa');
var path = require('path');

var wechat = require('./wechat/g');
var util = require('./libs/util');


var wechat_file = path.join(__dirname, './config/wechat.txt');

var config = {
    wechat : {
        appID : 'wx987f75bb63a127b7',
        appSecret : '202a0ae869cfffd0cb24d18d32686577',
        token : 'whjtest',
        getAccessToken : function(){
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken : function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data)
        }
    }
};


var app = new Koa();

// functioan 后 加 * 生成器函数  是一种可以从中退出并在之后重新进入的函
app.use(wechat(config.wechat));

app.listen(80);
console.log('localhost:80');