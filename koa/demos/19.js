const Koa = require('koa');
const app = new Koa();

const main = ctx =>{
    let num = Number(ctx.cookies.get('views') || 0) + 1;
    ctx.cookies.set('views', num);
    ctx.response.type = 'html';
    ctx.response.body = '刷新了'+ num + '次';
}

app.use(main);
app.listen(3000);