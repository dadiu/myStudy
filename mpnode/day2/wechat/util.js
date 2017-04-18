'use strict'

var xml2js = require('xml2js');
var Promise = require('bluebird');


// 解析xml
exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve, reject){
        xml2js.parseString(xml, {trim: true}, function(err, content){
            if(err){
                reject(err);
            }
            else {
                resolve(content)
            }
        })
    })
}


function formatMessage(result){
    var message = {};

    if(typeof result === 'object'){
        var keys = Object.keys(result);
        var i = 0;
        var iLen = keys.length;

        for(; i < iLen; i++){
            var item = result[keys[i]];
            var key = keys[i];

            if(!(item instanceof Array) || item.length === 0){
                continue;
            }

            if(item.length === 1){
                var val = item[0];

                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }
                else {
                    message[key] = (val || '').trim();
                }
            }
            else {
                message[key] = [];

                var j = 0;
                var jLen = item.length; 

                for(; j < jLen; j++){
                    message[key].push(formatMesage[item[j]]);
                }
            }
        }
    }

    return message;
};

// 格式化xml
exports.formatMessage = formatMessage;