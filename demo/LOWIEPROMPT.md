
版本说明
- v1.0.1 - 修改从ie7开始提示。
- v1.0.0 - 创建

**JS说明**

IE7浏览器时，页面出现demo;如果不是，则不运行js


[源码](src/js/lowIePrompt.js)

[压缩](publish/build/js/lowIePrompt.min.js)


**依赖**


    http://static.m3guo.com/17m3/lowIePrompt/styles/lowIe.min.css



**可传入参数**


    z: {Number} 设置元素的堆叠顺序,默认999。



**传参方式**


类似URL传参，在?后添加z=Number;




**实例**

在页面底部中插入该行js

    <script type="text/javascript" id="fn_lowIePrompt" src="http://static.m3guo.com/17m3/lowIePrompt/js/lowIePrompt.min.js?z=99"></script>




