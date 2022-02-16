'use strict'
const gulp           = require('gulp')
const sass           = require('gulp-sass')(require('sass'))
const browserSync    = require('browser-sync').create()
const uglify         = require('gulp-uglify-es').default
const concat         = require('gulp-concat')
const autoprefixer   = require('gulp-autoprefixer')
const del            = require('del')

// import imagemin from 'gulp-imagemin';

//-----------------------------------------------------------
//autoprefixer plugin
exports.default = () => (
	gulp.src('app/*.css')
		.pipe(autoprefixer
        ({
            // не подключает опцию для грида ни одним из способов
            // grid: true,
            // grid: no-autoplace,
            // grid: 'no-autoplace'
		}))
		.pipe(gulp.dest('dist/styles/css'))
);
//-----------------------------------------------------------
//gulp-sass plugin
function buildStyles()
{
    return gulp.src('app/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/sass/'))
    .pipe(browserSync.stream())
};
exports.buildStyles = buildStyles

//-----------------------------------------------------------
//browser-sync plugin
function browsersync()
{
    browserSync.init
    ({
        server:
        {
            baseDir: 'app/'
        },
        notify: false
    })
}
exports.browsersync = browsersync

//-----------------------------------------------------------
//js uglify
function scripts()
{
    return gulp.src
    ([
        // '', another file before index js
        'app/js/index.js'
    ])
    .pipe(concat('app/js/compressed_index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream())
}
exports.scripts = scripts
//-----------------------------------------------------------
// imagemin plugin
// на гитхабе пока нет решения бага с import 

// function images()
// {
//     return gulp.src('app/images/**/*')
//     .pipe(imagemin
//         ([
//         imagemin.gifsicle({interlaced: true}),
//         imagemin.mozjpeg({quality: 75, progressive: true}),
//         imagemin.optipng({optimizationLevel: 5}),
//         imagemin.svgo
//         ({
//             plugins:
//             [
//                 {removeViewBox: true},
//                 {cleanupIDs: false}
//             ]
//         })
//         ]))
//     .pipe(gulp.dest('dist/images'))
// } 
// exports.images = images

//-----------------------------------------------------------
//build function
function build()
{
        return gulp.src
        ([
            'app/*.html',
            'app/sass/style.css',
            'app/fonts/**/*',
            'app/js/index.js',
            'app/fonts/**/*'
        ],
        {base: 'app'})
        .pipe(gulp.dest('dist'))
}
exports.build = gulp.series(cleanDist, build)

//-----------------------------------------------------------
//del plugin

function cleanDist()
{
    return del('dist')
}
exports.cleanDist = cleanDist

//-----------------------------------------------------------
//watching function
function watching()
{
    gulp.watch('app/sass/**/*.scss', buildStyles)
    gulp.watch(['app/**/*.js', '!app/**/compressed_index.js'], scripts)
    gulp.watch('app/*.html').on('change', browserSync.reload)
}
exports.watching = watching

//-----------------------------------------------------------
//default starting

exports.default = gulp.parallel(buildStyles, scripts, browsersync, watching)
