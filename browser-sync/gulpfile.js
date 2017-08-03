const browserSync = require('browser-sync');
const reload = browserSync.reload;
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpClean = require('gulp-clean');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const sass = require('gulp-sass');
const filter = require('gulp-filter');
const base64 = require('gulp-base64')
const mincss = require('gulp-clean-css')

const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');

const path = require("path");   

const PROTS = 30000;
const basePath = './app/';
const devPath = './build/';
const pubPath = './dist/';

let _path = process.argv[2] === 'publish' ? pubPath : devPath; // 是否是开发环境
let isDist = process.argv[2] === 'publish' ? true : false;      // 是否需要压缩



/** start */
gulp.task('buildImg', function(){

    return gulp.src(basePath + 'img/**/*.{png,jpg,gif,ico}')
    .pipe(gulp.dest(_path + 'img'));

});

gulp.task('buildCss',function () {

    return gulp.src(basePath + 'scss/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            sourceMap: true
        }))
        .pipe(base64({
            extensions: ['svg', 'png', 'jpg', 'gif'],
            maxImageSize: 10 * 1024, // bytes
            debug: false
        }))
        .pipe(gulpIf(isDist, mincss({
			"compatibility" : "ie6",		//保留ie6及以上兼容写法
			"advanced" : false,				//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）
			"keepBreaks" : true,			//类型：Boolean 默认：false [是否保留换行]
            "keepSpecialComments" : "*"		//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
		})))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(_path + 'css'))
        .pipe(filter('**/*.css'))
        .pipe(reload({
            stream: true
        }))

})

gulp.task('buildJS', function () {


    return gulp.src(basePath + 'js/*.js')
        .pipe(concat("main.js"))
        .pipe(jshint())
        .pipe(gulpIf(isDist, uglify()))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(_path + 'js'))
        .pipe(reload({
            stream: true
        }))
})


gulp.task('copyFile', function () {

    return gulp.src([basePath + '*.html'])
        .pipe(gulp.dest(_path))
        .pipe(reload({
            stream: true
        }))
})

gulp.task('buildClean', function(){

    let cleanPath = _path === pubPath ? devPath : pubPath; 

    return gulp.src([cleanPath], { read : false })
                .pipe(gulpClean())

})


// 静态服务器
gulp.task('browser-sync', function () {

    browserSync.init({
        files: "css/*.css",
        port : PROTS,
        server: {
            baseDir: path.join(__dirname, _path)
        }
    })

});

// 本地预览
gulp.task('default', ['buildClean','buildJS', 'buildCss', 'buildImg', 'copyFile', 'browser-sync'], function () {

    gulp.watch(basePath + 'scss/*.scss', ['buildCss']);
    gulp.watch(basePath + 'js/*.js', ['buildJS']);
    gulp.watch(basePath + '*.html', ['copyFile']);

})

// 发布
gulp.task('publish', ['buildClean','buildJS', 'buildCss', 'buildImg', 'copyFile'], function () {
    
    console.log("publish ok")
})