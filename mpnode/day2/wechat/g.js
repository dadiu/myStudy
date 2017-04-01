'use strict'

var sha1 = require('sha1');
var Wechat = require('./wechat');



// 中间件
module.exports = function(opts){
    
    // 初始化wechat 管理票据的更新
    var wechat = new Wechat(opts);

    
    return function *(next){
        console.log(this.query);

        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);

        console.log(this.method);
        
        // mark
        // 学到了 http://coding.imooc.com/lesson/38.html#mid=286
        // 下班 回家再继续搞
        if(this.method === 'GET'){
            if(sha === signature){
                this.body = echostr + '';
            }
            else {
                this.body = 'wrong';
            }
        }
        else if(this.method === 'POST'){
            if(sha !== signature){
                return ;
            }

        }
        
    }
} 
