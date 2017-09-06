
# browser-sync + gulp 自动化工具

## 技术栈
+ sass
+ browser-sync
+ gulp


## 使用方法

- 本地运行 

        npm run dev

- 发布

        npm run build


### 注意事项
- gulp-sass 依赖  node-sass , 所以先安装 node-sass, node-sass墙得比较厉害，建议做以下操作先镜像到淘宝
    + macOS 系统运行下面的命令即可：

                    SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass --save-dev

    + windows 系统运行下面的命令即可：

                    set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
                    npm install node-sass --save-dev
                    
    + 安装好了 node-sass 之后，再安装 gulp-sass

                    npm install gulp-sass --save-dev

- es转码

```js

# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3

```



### 留着有空扩展用

```js
gulp-rename
重命名文件
gulp-concat
合并文件
gulp-uglify
压缩js文件
gulp-cssnano
压缩css文件
browserify
让你使用类似于 node 的 require() 的方式来组织浏览器端的 Javascript 代码
vinyl-source-stream
将Browserify的bundle()的输出转换为Gulp可用的vinyl（一种虚拟文件格式）流




1.babel-core babel-preset-es2015 gulp-babel   用于解析es6转换为es5

2.browser-sync  服务器同步浏览

3.gulp-autoprefixer  根据设置浏览器版本自动处理浏览器前缀

4.gulp-cache  图片快取，只有更改过得图片会进行压缩

5.gulp-clean 清空文件夹

6.gulp-cssnano 压缩CSS代码

7.gulp-htmlmin 压缩html

8.gulp-if 用于判断

8.gulp-imagemin 图片压缩

9.gulp-load-plugins 自动加载（超级有用 省去一大堆代码）

10.gulp-plumber 管道工 不会让错误爆出来 继续执行

11.gulp-sass 预编译Sass

12.gulp-size 统计管道里面内容的大小的,上面是用它来显示出压缩前后的大小用来对比用

13.gulp-sourcemaps 当压缩的JS出错，能根据这个找到未压缩代码的位置 不会一片混乱代码

14.gulp-uglify JS压缩

15.gulp-useref 将html引用顺序的CSS JS 变成一个文件  

例如：<!-- build:js scripts/main.js --> <script src="1.js"></script><script src="2.js"></script><!--endbuild--> 最后变成<script src="main.js"></script>

16.gulp-rev-append html引用添加版本号

17.main-bower-files 找到bower.json里配置的 overrides 下配置的main下的路径

18.wiredep 在.html文件会把默认bower.json的配置自动注入到下面标签中去 <!-- bower:js --> <!-- endbower --> <!-- bower:css--> <!-- endbower -->


```