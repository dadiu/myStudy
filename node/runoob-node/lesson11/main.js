/**
 * Node.js 常用工具
 * http://www.runoob.com/nodejs/nodejs-util.html
 */
var util = require('util');

// 基础对象 喊 3个构造函数
var Base = function(){
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function(){
        console.log('Hello ' + this.name);
    }
};

// 原型中定义函数
Base.prototype.showName = function(){
    console.log('showName : ' + this.name);
};


// 声明式函数
function Sub(){
    this.name = 'sub';
}


// util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
util.inherits(Sub, Base);

var newBase = new Base();
newBase.showName();
newBase.sayHello();
console.log(newBase);

console.log('---------------------');

var newSub = new Sub();
newSub.showName();

// 报错  newSub.sayHello is not a function
// newSub.sayHello();

console.log(newSub);


console.log('console.log 打印不出原型中定义的函数，util.inherits仅集成原型中定义的函数 ');