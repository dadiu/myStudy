# 面试心得 - 虽然不知道为啥总是要问这些= =


以下解释仅代表个人理解，如有错误请开个issues提醒下，谢谢。
具体解释可参考推荐的连接。

====================


### 闭包
- 解释：所谓“闭包”，指的是一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。
- 优点：1. 逻辑连续; 2. 方便调用; 3. 保护变量
- 缺点：内存浪费，IE6容易溢出
- 解决方案：推出之前，将函数内部不使用的局部变量全部删除
- 推荐教程：<http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html>


### 垃圾回收机制
- 原理：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存。


### 跨域
- 解释：只要协议、域名、端口有任何一个不同，都被当作是不同的域。
- 解决方法：
- 1. 通过jsonp跨域
- 2. 通过修改document.domain来跨子域
- 3. 使用window.name来进行跨域
- 4. 使用HTML5中新引进的window.postMessage方法来跨域传送数据
- 推荐教程：<http://www.cnblogs.com/2050/p/3191744.html>


### 原生JS 异步请求

### angular优缺点

### zepto和jquery的差别

### 巨大数组如何排序

### this的用法
- 1.纯粹的函数调用
- 2.作为对象方法的调用
- 3.作为构造函数调用
- 4.apply调用（这里可能会扩展到call和bind，会问之间的差异）
- 推荐教程：<http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html>

### html css js DOM树渲染过程 
- 提问：为什么css可以写在前面，js不可以？
- 回答：
- 1. css（包括图片）是异步加载，js是同步（即产生阻塞，因为js可能会改变DOM结构，如：document.write("test")）; 
- 2. js也许有可能会依赖css的读取，如：$("#Test").width();
- 推荐教程：<http://www.jianshu.com/p/e141d1543143>

### 多线程 / 单线程

### 网络编程

### 数据储存

### 网络通讯机制


