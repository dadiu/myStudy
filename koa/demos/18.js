const Koa = require('koa');
const app = new Koa();

const handdle = async(ctx, next) => {
    try{
        await next();
    } catch(err){
        console.log('handdle');
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html';
        ctx.response.body = err.message;

        // 手动释放error事件
        ctx.app.emit('error', err, ctx);
    }
}

const main = ctx =>{
    ctx.throw(500);
}

app.on('error', (err, ctx)=>{
    console.log('app error');
    console.error('errror status' + err);
})

app.use(handdle);
app.use(main);
app.listen(3000);