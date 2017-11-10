/**
 * Node.js EventEmitter
 * http://www.runoob.com/nodejs/nodejs-event.html
 */


var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();


event.on('some_event', function (arg1, arg2) {
    console.log('listen2', arg1, arg2);
});

event.on('some_event', function (arg1, arg2) {
    console.log('listen1', arg1, arg2);
});

event.emit('some_event', '参数1', '参数2');