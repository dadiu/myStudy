const Koa = require('koa');
const route = require('koa-route');

const about = ctx =>{

    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx =>{

    ctx.response.body = 'Hello Main';
};


const app = new Koa();
app.use(route.get('/', main));
app.use(route.get('/about', about));

app.listen(3000);
