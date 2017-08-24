const Koa = require('koa');
const app = new Koa();

// eg14 500 错误
// const main = ctx =>{
//     ctx.throw(500);
// }



// eg15 404错误
// const main = ctx =>{
//     ctx.response.status = 404;
//     ctx.response.body = 'Not Found'
// }



// eg16 try...catch...
// const handdle = async (ctx, next) => {  
//     try{
//         await next();
//     } catch(err) {
//         ctx.response.status = err.statusCode || err.status || 500;
//         ctx.response.body = err.message;       
//     }
// }
// const main = ctx =>{
//     ctx.throw(500);
// }
// app.use(handdle);



// eg17 error
const main = ctx =>{

    ctx.throw(500);
    // ctx.response.status = 500; // 此方法error事件捕捉不到
}

app.on('error', (err, ctx) =>{
    console.error('server error', err);
});

app.use(main);
app.listen(3000);

