const Koa = require('koa');
const app = new Koa();

// eg14 500 错误
// const main = cxt =>{
//     cxt.throw(500);
// }



// eg15 404错误
// const main = cxt =>{
//     cxt.response.status = 404;
//     cxt.response.body = 'Not Found'
// }



// eg16 try...catch...
// const handdle = async (cxt, next) => {  
//     try{
//         await next();
//     } catch(err) {
//         cxt.response.status = err.statusCode || err.status || 500;
//         cxt.response.body = err.message;       
//     }
// }
// const main = cxt =>{
//     cxt.throw(500);
// }
// app.use(handdle);



// eg17 error
const main = cxt =>{

    cxt.throw(500);
    // cxt.response.status = 500; // 此方法error事件捕捉不到
}

app.on('error', (err, cxt) =>{
    console.error('server error', err);
});

app.use(main);
app.listen(3000);

