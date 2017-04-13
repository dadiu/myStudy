
var Koa = require('koa');
var sha1 = require('sha1');

var config = {
    "wechat" : {
        "appID" : "wx987f75bb63a127b7",
        "appSecret" : "202a0ae869cfffd0cb24d18d32686577",
        "token" : "whjtest"
    }
}

var app = new Koa();

app.use(function *(next){
    console.log(this.query);

    var token = config.wechat.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);

    console.log("signature:" + signature);
    console.log("sha:" + sha);
    console.log(sha === signature);

    if(sha === signature){
        this.body = echostr + '';
    }
    else {
        this.body = 'wrong';
    }
})

app.listen(80);
console.log('localhost:80');