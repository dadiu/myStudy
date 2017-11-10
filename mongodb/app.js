var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose');
var Movies = require('./models/movie');
var _ = require('underscore');
mongoose.connect('mongodb://localhost/mongodb');

app.set('views', './views/pages'); // 默认打开页
app.set('view engine', 'jade'); // 默认模板引擎
app.use(express.static(path.join(__dirname, 'bower_components'))); //默认js和css路径
app.listen(port); //监听端口

console.log("open : 192.168.110.182:" + port);


//index page
app.get('/', function(req, res) {

	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		};
		res.render('index', {
			title: "首页",
			movies : movies
		})
	})
	
})

//detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id;


	Movie.findById(id, function(err, movie){
		if(err){
			console.log(err)
		};

		res.render('detail', {
			title: movie.title,
			movie : movie
		})
	});
})

//admin page
app.get('/admin', function(req, res) {
	res.render('admin', {
		title: "后台录入页",
		movie : {
			title : '',
			doctor : '',
			country : '',
			year : '',
			poster : '',
			language : '',
			flash : '',
			summary : ''
		}
	})
})

// admin update
// 更新路由
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id;

	if(id){
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title : '后台录入页',
				movies : movie
			})
		});
	}
})

// admin post movie
// 获取后台录入页post过来的数据
app.post('/admin/movie/new', function(req, res){
	var id = res.body.movie._id;
	var movieObj = req.body.movie;

	if(id !== 'undefined') {	//如果已存在
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			};

			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie){
				if(err){
					console.log(err);
				};
				
				res.redirect('/movie/' + movie._id);
			})
		})
	} else {		//如果未存在
		_movie = new Movie({
			doctor : movieObj.doctor,
			title : movieObj.title,
			country : movieObj.country,
			language : movieObj.language,
			year : movieObj.year,
			poster : movieObj.poster,
			summary : movieObj.summary,
			flash : movieObj.flash
		});

		_movie.save(function(err, movie){
			if(err){
				console.log(err);
			};

			res.redirect('/movie/' + movie._id);
		})
	}
})

//list page
app.get('/admin/list', function(req, res) {

	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		};
		res.render('list', {
			title: "后台录入页",
			movies : movies
		})
	})
})