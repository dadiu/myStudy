const Koa = require('koa');
const app = new Koa();

const main = cxt =>{
    let num = Number(cxt.cookies.get('views') || 0) + 1;
    cxt.cookies.set('views', num);
    cxt.response.type = 'html';
    cxt.response.body = '刷新了'+ num + '次';
}

app.use(main);
app.listen(3000);