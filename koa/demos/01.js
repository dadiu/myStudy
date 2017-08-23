const Koa = require("koa");

const app = new Koa();

// eg 03
// const main = ctx => {
//     // ctx.response.body = "hello word";
//     if(ctx.request.accepts('xml')){

//         ctx.response.type = 'xml';
//         ctx.response.body = '<data>hello word</data>';
//     }
//     else if(ctx.request.accepts('json')){

//         ctx.response.type = 'json';
//         ctx.response.body = {data : 'hello word'};
//     }
//     else if(ctx.request.accepts('html')){

//         ctx.response.type = 'html';
//         ctx.response.body = '<p>hello word</p>'
//     }
//     else {

//         ctx.response.type = 'text';
//         ctx.response.body = 'hello word';
//     }
// }


// eg 04
// const fs = require("fs");
// const main = ctx => {

//     ctx.response.type = 'html';
//     ctx.response.body = fs.createReadStream('./demos/template.html');

// }

// eg 05
const main = ctx =>{
    console.log('path' + ctx.request.path);
    if(ctx.request.path !=='/'){
        ctx.response.type = 'html';
        ctx.response.body = '<a href="/">Index Page</a>';
    } else {
        ctx.response.body = 'Hello Word';
    }
}


app.use(main);
app.listen(3000);