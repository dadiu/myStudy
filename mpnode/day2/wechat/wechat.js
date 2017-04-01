'use strict'

var sha1 = require('sha1');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));


var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    accessToken : prefix + 'token?grant_type=client_credential'
}
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

function Wechat(opts){

    // 读取和写入票据
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.getAccessToken()
        .then (function(data){

            // 读取票据
            try {

                data = JSON.parse(data)
            }
            catch(e){

                // 捕获异常 更新票据
                return that.updateAccessToken();
            }

            // 判断票据是否在有效期内 检查合法性
            if(that.isValidAccessToken(data)){
                // 如果合法 传下去
                Promise.resolve(data);
            }
            else {
                // 如果不合法过期 则更新票据
                return that.updateAccessToken();
            }
        })
        .then(function(data){   // 最终票据结果
            
            // 把access_token挂到实例上
            that.access_token = data.access_token;

            // 把过期时间挂到实例上
            that.expires_in = data.expires_in;

            // 储存票据
            that.saveAccessToken(data); 
        })
};


// 合法性检查
Wechat.prototype.isValidAccessToken = function(data){

    // 验证是否存在
    if(!data || !data.access_token || !data.expires_in){
        return false;
    }

    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    if(now < expires_in) {
        // 未过期
        return  true;
    }
    else{
        // 已过期
        return false;
    }
}

// 更新票据
Wechat.prototype.updateAccessToken = function(){

    var appID = this.appID;
    var appSecret = this.appSecret;
    
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

    return new Promise(function(resolve, reject){
        // 向某个服务器发送请求
        request({
            url : url,
            json : true
        }).then(function(response){

            var data = response.body;
            var now = (new Date().getTime());

            // 过期时间提前20秒更新 考虑网络延迟
            var expires_in = now + (data.expires_in - 20)*1000;

            // 缩短后的过期时间复制给数据本身
            data.expires_in = expires_in;

            // 继续向下传递
            resolve(data);        
        })
    });

}
