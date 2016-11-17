var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

// add EventListener


// 重置最大长度， 默认10
life.setMaxListeners(11);

//匿名函数 - 可用于后期单独删除
function water (who){
	console.log('give ' + who + ' water1');
}

life.on('求安慰', water);

// 单独删除单个监听
// life.removeListener('求安慰', water)


life.on('求安慰', function(who){
	console.log('give ' + who + ' water2');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water3');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water4');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water5');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water6');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water7');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water8');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water9');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water10');
});
life.on('求安慰', function(who){
	console.log('give ' + who + ' water11');
});
life.on('求溺爱', function(who){
	console.log('give ' + who + ' money');
});
life.on('求溺爱', function(who){
	console.log('give ' + who + ' cloth');
});

// var hasConfortListener = life.emit('求安慰', 'man');
// var haslovedLister = life.emit('求溺爱', 'girl');


// 移除监听
life.removeAllListeners('求溺爱');	


// 获取长度的两个方法
console.log(life.listeners('求溺爱').length);
console.log(EventEmitter.listenerCount(life, '求安慰'));



// 运行
// life.emit('求安慰', 'man');
// life.emit('求溺爱', 'girl');


// 判断是否存在这个方法 
// var hasMan = life.emit('求安慰', 'man');
// var hasGirl = life.emit('求溺爱', 'girl');
// var hasPlay = life.emit('求玩坏', 'boy and girl');

// console.log(hasMan);
// console.log(hasGirl);
// console.log(hasPlay);
