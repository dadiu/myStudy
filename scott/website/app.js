var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('underscore'); // ???
var port = process.env.PORT || 3000;
var app = express();

var Movie = require('./models/movie');

mongoose.connect('mongodb://localhost:27017/scott' ,{useMongoClient: true}); // 需要启动mongod

app.set('views', './views/pages'); // 视图目录
app.set('view engine', 'jade'); // 默认引擎


// 提交表单格式化
app.use(bodyParser.urlencoded())

app.use(express.static(path.join(__dirname, 'bower_components'))); // 静态文件

app.listen(port);

console.log("website started on port : " + port);


// index page
app.get("/", function (req, res) {

    Movie.fetch(function (err, movies) {

        if (err) {
            console.log(err);
            return;
        }
        res.render('index', {
            title: '首页',
            movies: movies
        })
    })
})

// detail page
app.get("/movie/:id", function (req, res) {

    var id = req.params.id;

    Movie.findById(id, function (err, movie) {

        if (err) {
            console.log(err);
            return;
        }

        res.render('detail', {
            title: movie.title,
            movie: movie
        })
    })

})

// admin page
app.get("/admin", function (req, res) {
    res.render('admin', {
        title: '后台录入页',
        movie: {
            title: "",
            doctor: "",
            country: "",
            year: "",
            poster: "",
            flash: "",
            summary: "",
            language: ""
        }
    })
})


// admin update movie
app.get('/admin/update/:id', function (req, res) {
    console.log(req.params);

    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
                return;
            }

            res.render('admin', {
                title: "后台更新",
                movie: movie
            })
        })
    }

})

// admin add movie 
app.post('/admin/movie/new', function (req, res) {

    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;

    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
                return;
            }

            _movie = _.extend(movie, movieObj);

            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                    return;
                }

                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('_movie');
            console.log(_movie);
            res.redirect('/movie/' + movie._id);
        })

    }

})

// list page
app.get("/list", function (req, res) {

    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
            return;
        }

        res.render('list', {
            title: '列表页',
            movies: movies
        })
    })

})