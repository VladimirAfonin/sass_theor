let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
let cleanCss = require('gulp-clean-css');
let browserSync = require('browser-sync').create();

// create oject of config
let config = {
    paths: {
        less: './src/scss/**/*.scss',
        html: './public/index.html',
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public'
    },
};

gulp.task('sass', function() {
    return gulp.src(config.paths.less)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        // .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.output.path
        },
    });

    gulp.watch(config.paths.less, ['sass']); // task less
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'serve']);