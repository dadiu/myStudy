var gulp = require('gulp'),
	runSequence = require("run-sequence");

var mincss = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect'), 
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	gulpIf = require('gulp-if'),
	isPublish = false;	//是否发布环境

var devlopPath = "devlopment/",
	publishPath = "publish/";


gulp.task("concatAndBuildJs", function(){
	var _path = isPublish?publishPath:devlopPath;

	return gulp.src(["src/js/*.js"])
		.pipe(concat("main.js"))
		.pipe(gulp.dest("src/js/temp"))
		.pipe(gulpIf(isPublish, uglify()))
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest(_path+"build/js"));
});

gulp.task("buildCss", function(){
	var _path = isPublish?publishPath:devlopPath;

	return gulp.src("src/styles/*.css")
		.pipe(mincss({
			"compatibility" : "ie6",		//保留ie6及以上兼容写法
			"advanced" : false,				//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）
			"keepBreaks" : true,			//类型：Boolean 默认：false [是否保留换行]
            "keepSpecialComments" : "*"		//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
		}))
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest(_path+"build/styles/"));
});

gulp.task("copyFiles", function(){
	var _path = isPublish?publishPath:devlopPath;	

	return gulp.src(["index.html"], {base: "./"})
		.pipe(gulp.dest(_path));
});

gulp.task("cleanTemp", function(){
	return gulp.src(["src/js/temp"], {read: false})
				.pipe(clean());
});

gulp.task("clean", function(){
	var _path = isPublish?publishPath:devlopPath;

	return gulp.src([_path], {read: false})
				.pipe(clean());
});

gulp.task("watch", function(){
	gulp.watch("src/js/*.js", ["concatAndBuildJs"]);
	gulp.watch("src/styles/*.css", ["buildCss"]);
	gulp.watch("*.html", ["copyFiles"]);
});

gulp.task("webserver", function(){
	connect.server({
		livereload : true,
		port : 8000
	});
});

gulp.task("devlop", function(done){
	runSequence("clean", ["concatAndBuildJs", "buildCss", "copyFiles"], "cleanTemp", done);
});

gulp.task("publish", function(done){
	isPublish = true;
	runSequence("clean", ["concatAndBuildJs", "buildCss", "copyFiles", "clean"], "cleanTemp", done);
});

gulp.task("default", function(done){
	runSequence("clean", ["concatAndBuildJs", "buildCss", "copyFiles", "webserver", "watch"], "cleanTemp", done);
});