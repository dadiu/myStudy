var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulp = require('gulp');

var sass = require('gulp-sass');
var filter = require('gulp-filter');


var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var path = require("path");


var basePath = './app/';
var buildPath = './build/';


gulp.task('css', function () {

    return gulp.src(basePath + 'scss/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            sourceMap: true
        }))
        .pipe(gulp.dest(buildPath + 'css'))
        .pipe(filter('**/*.css'))
        .pipe(reload({
            stream: true
        }))

})

gulp.task('lint', function () {

    return gulp.src(basePath + 'js/*.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + 'js'));
})


gulp.task('copyFile', function () {

    return gulp.src([basePath + '*.html'])
        .pipe(gulp.dest(buildPath));
})


// 静态服务器
gulp.task('browser-sync', function () {

    browserSync({
        files: "css/*.css",
        server: {
            baseDir: path.join(__dirname, buildPath)
        }
    })

});

gulp.task('default', ['lint', 'css', 'copyFile', 'browser-sync'], function () {

    gulp.watch(basePath + 'scss/*.scss', ['css']);
    gulp.watch(basePath + 'js/*.js', ['lint']);
    gulp.watch(basePath + '*.html', ['copyFile']);
})