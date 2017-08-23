const Koa = require('koa');
const app = new Koa();


const logger = (cxt, next) => {
    console.log(`${Date.now()} ${cxt.request.method} ${cxt.request.url}`);
    next();
}

const main = ctx => {
    ctx.response.body = 'Hello World';
};

app.use(logger);
app.use(main);
app.listen(3000);