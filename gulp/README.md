<p style="background:red; color:white;">待解决问题：css压缩后，每个样式的最后一个;消失报错。</p>


版本说明
- v 1.0.0 - 创建


依赖node
-

**安装全局gulp**


    npm install -g gulp


**cd到项目文件夹 安装项目gulp**


    npm install --save-dev gulp


**安装依赖的gulp插件**


    npm install --save-dev run-sequence gulp-minify-css gulp-concat gulp-watch gulp-connect gulp-uglify gulp-rename gulp-clean gulp-if


使用说明
-
**启动服务，成功后可访问 localhost:8000/devlopment/ ** 


    gulp default



**不需要服务只需要预览**


	gulp devlop


**可发布文件**


	gulp publish
