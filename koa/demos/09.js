const Koa = require('koa');
const app = new Koa();


const one = (cxt, next) => {
    console.log('>>one');
    next();
    console.log('<<one');
}

const two = (cxt, next) => {
    console.log('>>two');
    next();
    console.log('<<two');
}

const three = (cxt, next) => {
    console.log('>>three');
    next();
    console.log('<<three');
}


app.use(one);
app.use(two);
app.use(three);
app.listen(3000);