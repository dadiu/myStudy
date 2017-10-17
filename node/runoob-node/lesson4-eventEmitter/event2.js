var events = require('events');
var eventEmitter = new events.EventEmitter();

var listener1 = function listener1 (){
    console.log('listener1 do');
};

var listener2 = function listener2 (){
    console.log('listener2 do');
};

// test1
eventEmitter.addListener('connection', listener1);

eventEmitter.on('connection', listener2);

var evenlisteners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(evenlisteners + '个监听事件');

eventEmitter.emit('connection');


// test2
eventEmitter.removeListener('connection', listener1);
console.log('listener1 不再受监听');

eventEmitter.emit('connection');

evenlisteners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(evenlisteners + '个监听事件');

console.log("程序结束");