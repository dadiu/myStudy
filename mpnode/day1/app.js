
var Koa = require('koa');
var sha1 = require('sha1');

var config = {
    wechat : {
        appID : 'wx546021bb85c4d355',
        appSecret : '636173d1052d4a50835ef72f1788a101',
        token : 'whjtest'
    }
}

var app = new Koa();

app.use(function *(next){
    console.log(this.query);

    var token = config.wechat.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.stamp;
    var echostr = this.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);

    console.log('sha = ' + sha);
    console.log('signature = ' + signature);

    if(sha === signature){
        this.body = echostr + '';
    }
    else {
        this.body = 'wrong';
    }
})

app.listen(1234);
console.log('localhost:1234');