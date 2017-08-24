Koa 框架
===

- Koa 必须使用 7.6 以上1的node版本

## 一、基本用法

- [实例：01](demos/01.js)

    + 判断客户端希望接受什么数据（根据 HTTP Request 的Accept字段）
    
    ```js
    ctx.request.accepts
    ```

    + 指定返回类型

    ```js
    ctx.response.type
    ```

    + 获取用户请求的路径

    ```js
    ctx.request.path
    ```


## 二、路由 

- 路由 [实例：06](demos/06.js)

    + koa-route   


- 静态资源 - [实例：12](demos/12.js)
    + koa-static


- 重定向 - [实例：13](demos/13.js)

    ```js
    ctx.response.redirect()
    ```

## 三、中间件

- 中间件处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。 [实例：07](demos/07.js)

- 每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是next函数。只要调用next函数，就可以把执行权转交给下一个中间件。[实例：08](demos/08.js)

- 中间件栈 ： 多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。 [实例：09](demos/09.js)

- 异步中间件 ： 有异步操作（比如读取数据库），中间件就必须写成 [async](http://es6.ruanyifeng.com/#docs/async) 函数。[实例：10](demos/10.js)

- 合成中间件 ： koa-compose模块可以将多个中间件合成为一个 [实例：11](demos/11.js)


## 错误处理

- ``ctx.throw()``方法，用来抛出错误[实例：14 注释部分eg14](demos/14.js)

- 如果将``ctx.response.status``设置成404，就相当于``ctx.throw(404)``，返回404错误。[实例：15 注释部分eg15](demos/14.js)

- 处理错误的中间件 : 为了方便处理错误，最好使用``try...catch``将其捕获。但是，为每个中间件都写``try...catch``太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。[实例：16  注释部分eg16](demos/14.js)

- error 事件的监听 ： 使用``ctx.response.status = 500;``  error事件捕捉不到。[实例：17 未注释部分eg17](demos/14.js)

- 释放 error 事件 ： 如果错误被``try...catch``捕获，就不会触发``error事件``。这时，必须调用``ctx.app.emit()``，手动释放error事件，才能让监听函数生效。[实例：18](demos/18.js)



## 五、Web App 的功能

- Cookies : ``ctx.cookies``用来读写 Cookie [实例19](demos/19.js)
    + ctx.cookies.get(name, [options])
    + ctx.cookies.set(name, value, [options])
    + options 为可选参数：
        - ``signed`` : 如果为 true，表示请求时 cookie 需要进行签名
        - ``expires`` : cookie 有效期时间
        - ``path`` : cookie 的路径，默认为 /'
        - ``domain`` : cookie 的域
        - ``secure`` : false 表示 cookie 通过 HTTP 协议发送，true 表示 cookie 通过 HTTPS 发送。
        - ``httpOnly`` : true 表示 cookie 只能通过 HTTP 协议发送


- 表单
    + koa-body
    + [实例20](demos/20.js)

- 文件上传
    + koa-body
    + [实例21](demos/21.js)


## 六、设置签名Cookie密钥，该密钥会被传递给 ``KeyGrip``
    
- 自己生成 KeyGrip 实例

    ```js

    app.keys = ['im a newer secret', 'i like turtle'];
    app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

    ```
- 在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：

    ```js
    
    this.cookies.set('name', 'tobi', { signed: true });

    ```