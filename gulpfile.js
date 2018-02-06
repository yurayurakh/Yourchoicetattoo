"use strict";

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    concatCss = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    concatjs = require('gulp-concat'),
    minifyjs = require('gulp-minify'),
    plumber = require('gulp-plumber'), //(Предохраняем Gulp от вылета)
    imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminPngquant = require('imagemin-pngquant');


// Создадим переменную с настройками плагина plumber для захвата ошибок
var plumberOptions = {
    handleError: function (err) {
        console.log(err);
        this.emit('end');
    }
};

// Concat js
gulp.task('scripts', function() {
    return gulp.src('build/js/*.js')
        .pipe(plumber())
        .pipe(concatjs('common.js'))
        .pipe(minifyjs(''))
        .pipe(gulp.dest('app/js/'))
        .pipe(connect.reload());
});

//Local Server(localhost:8080)
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

// Sass
gulp.task('sass', function () {
    gulp.src('build/sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(concatCss("style.css"))
        .pipe(prefix('last 15 versions'))
        .pipe(minifyCSS(''))
        .pipe(gulp.dest('app/css/'))
        .pipe(connect.reload());
});


//Html
gulp.task('html', function(){
    gulp.src('app/*.html')
        .pipe(plumber())
        .pipe(connect.reload());
});

//Watch
gulp.task('watch', function () {
    gulp.watch('build/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('build/js/*.js', ['scripts']);
});

// Таск для оптимизации изображений
gulp.task('img:prod', function () {
    return gulp.src('build/img/**/*.*') //Выберем наши картинки
        .pipe(debug({title: 'building img:', showFiles: true}))
        .pipe(plumber(plumberOptions))
        .pipe(gulp.dest('app/img/')) //Копируем изображения заранее, imagemin может пропустить парочку )
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            imagemin.svgo({
                plugins: [
                    {
                        removeViewBox: false,
                        cleanupAttrs: true,
                        removeComments: true,
                        removeTitle: true,
                        removeDesc: true,
                        removeEmptyAttrs: true,
                        minifyStyles: true,
                        convertColors: true
                    }
                ]
            }),
            imageminPngquant({quality: '80'})
        ]))
        .pipe(gulp.dest('app/img/')); //И бросим в prod отпимизированные изображения
});

gulp.task('default', ['connect', 'html', 'sass', 'scripts', 'watch']);