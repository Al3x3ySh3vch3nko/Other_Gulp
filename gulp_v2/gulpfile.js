const {src, dest, series, parrallel, watch} = require ('gulp')
const sass                                  = require ('gulp-sass')(require('sass'))
const csso                                  = require ('gulp-csso')
const include                               = require ('gulp-file-include')
const htmlmin                               = require ('gulp-htmlmin')
const sync                                  = require ('browser-sync').create()
const del                                   = require ('del')
const concat                                = require ('gulp-concat')
const autoprefixer                          = require ('gulp-autoprefixer')

function f_buildhtml()
{
    return src('src/**.html')
    .pipe(include
    ({
        prefix: '@@'
    }))
    .pipe(htmlmin
    ({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function f_buildcss()
{
    return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist/css/'))
}

function f_clear()
{
    return(del('dist'))
}

function f_serve()
{
    sync.init
    ({
        server: './dist'
    })

    watch('src/**.html', series(f_buildhtml)).on('change',sync.reload)
    watch('src/scss/**.scss', series(f_buildcss)).on('change',sync.reload)
}

exports.html  = f_buildhtml
exports.css   = f_buildcss
exports.clear = f_clear
exports.build = series(f_clear,f_buildcss,f_buildhtml)
exports.serve = series(f_clear,f_buildcss,f_buildhtml,f_serve)
