const Koa = require('koa');
const app = new Koa();


const main = cxt => {
    console.log(`${Date.now()} ${cxt.request.method} ${cxt.request.url}`);
    cxt.response.body = 'hello word';
}
app.use(main);
app.listen(3000);