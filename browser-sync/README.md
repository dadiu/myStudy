
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