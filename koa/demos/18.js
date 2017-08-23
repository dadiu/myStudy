const Koa = require('koa');
const app = new Koa();

const handdle = async(cxt, next) => {
    try{
        await next();
    } catch(err){
        console.log('handdle');
        cxt.response.status = err.statusCode || err.status || 500;
        cxt.response.type = 'html';
        cxt.response.body = err.message;

        // 手动释放error事件
        cxt.app.emit('error', err, cxt);
    }
}

const main = cxt =>{
    cxt.throw(500);
}

app.on('error', (err, cxt)=>{
    console.log('app error');
    console.error('errror status' + err);
})

app.use(handdle);
app.use(main);
app.listen(3000);