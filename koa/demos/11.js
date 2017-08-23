const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const logger = (cxt, next) =>{
    console.log(`${Date.now()} ${cxt.request.method} ${cxt.request.url}`);
    next();
}

const main = cxt =>{
    cxt.response.body = 'hello word';
}

const middlewares = compose([logger, main]);

app.use(middlewares);
app.listen(3000);


