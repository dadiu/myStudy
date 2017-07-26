var async = require('async');

var conCurrentCount = 0;
var fatchUrl = function(url, callback){

    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    conCurrentCount ++;
    console.log('total: ', conCurrentCount, ' now: ', url, ' time: ' + delay + 'ms');

    setTimeout(function() {
       conCurrentCount--;
       callback(null, url + ' html content'); 
    }, delay);
}

var urls = [];
var i = 0;
for(;i < 10; i++){
    urls.push('http://datasource_' + i);
};

async.mapLimit(urls, 5, function(url, callback){

    fatchUrl(url, callback);

}, function(err, result){

    console.log('final: ');
    console.log(result);
})

// console.log(urls);