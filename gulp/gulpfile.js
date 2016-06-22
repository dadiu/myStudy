var gulp = require('gulp'),
	runSequence = require("run-sequence");

var mincss = require('gulp-minify-css'),
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
		.pipe(mincss())
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
		port : 80,
		root: ['.', '.tmp']
	});
});

gulp.task("livereload", function(){
	gulp.src(["src/js/*.js", "src/styles/*.css"])
		.pipe(watch())
		.pipe(connect.reload());
});

gulp.task("devlop", function(done){
	runSequence("clean", ["concatAndBuildJs", "buildCss", "copyFiles"], "cleanTemp", done);
});

gulp.task("publish", function(done){
	isPublish = true;
	runSequence("clean", ["concatAndBuildJs", "buildCss", "copyFiles"], "cleanTemp", done);
});

gulp.task("default", function(done){
	runSequence("clean", ["concatAndBuildJs", "buildCss", "copyFiles", "webserver", "watch"], "cleanTemp", done);
});