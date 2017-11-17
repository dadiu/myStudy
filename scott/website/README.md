建站
---

- step1 安装依赖

```
npm install express --save
npm install jade --save
npm install mongoose --save

npm install bower -g

bower install bootstrap

```

- step2 创建视图

```
 website/
    - node_modules/
    - bower_components/
    - views/
        - includes/
            - head.jade
            - header.jade
        - pages/
            - index.jade
            - detail.jade
            - admin.jade
            - list.jade
        - layout.jade
    - models/       ----> 模型
        - movie.js
    - schemas/      ----> 模式
        - movie.js
    - app.js

```

- step3 测试前端流程

```
    - localhost:3000/
    - localhost:3000/movie/1
    - localhost:3000/admin/movie
    - localhost:3000/admin/list

```




## 运行方式