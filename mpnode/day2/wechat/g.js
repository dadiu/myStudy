'use strict'

var sha1 = require('sha1');
var getRawBody = require('raw-body');
var Wechat = require('./wechat');



// 中间件
module.exports = function(opts){
    
    // 初始化wechat 管理票据的更新
    var wechat = new Wechat(opts);

    return function *(next){
        
        console.log(this.query);

        // 加密逻辑
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);

        console.log(this.method);
        if(this.method === 'GET'){
            if(sha === signature){
                this.body = echostr + '';
            }
            else {
                this.body = 'get wrong';
            }
        }
        else if(this.method === 'POST'){
            if(sha !== signature){
                this.body = 'post wrong';
                return false;
            }

            var data = yield getRawBody(this.req, {
                length : this.length,
                limit : '1mb',
                encoding : this.charset
            });

            console.log('post ' + data.toString());

        }
        
    }
} 
