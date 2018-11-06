const path = require('path');

const express = require('express');
const pug = require('pug');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/baseData');
const passport = require('passport');

const app = express();

let articlesRouter = require('./routes/article');
let userRouter = require('./routes/user');
let todolistRouter = require('./routes/todolist');

let Article = require('./models/article');


mongoose.connect(config.baseDataLink, {
        useNewUrlParser: true
    },
    function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('success')
        }
    });

// let db = mongoose.connection;

// db.once('open', (res) => {
//     console.log('mongodb is connected')
// });
// db.on('error', (err) => {
//     console.log(err);
// })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


// 提示
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}))
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// login=>[顺序不要改]
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// 记录user=>[顺序不要改]
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})
app.post('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})


// router=>[顺序不要改]
app.use('/articles', articlesRouter);
app.use('/user', userRouter);
app.use('/todolists', todolistRouter);


// 初始页面
app.get('/', (req, res) => {

    // res.send('Hello word')
    Article.find({}, (err, articles) => {
        // console.log(articles);
        if (err) {
            console.log(err);
        } else {
            res.render('articles/index', {
                articles: articles
            });
        }
    })
})



app.listen(5000, () => {
    console.log('server is listen at : 5000');
});