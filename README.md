# Other_Gulp
Gulp builts

==============

### Справка

1. Установить глобально Node js [[+]](https://nodejs.org/ru/)
2. Установить глобально Gulp [[+]](https://gulpjs.com/docs/en/getting-started/quick-start/)
3. Установить глобально npm-check-updates [[+]](https://www.npmjs.com/package/npm-check-updates)
4. Перенести файлы сборки Gulp в проект (gulpfile.js | src | package.json)
5. Проверить, что модули сборки актуальной версии (консоль) -> $ ncu. Если нужно обновление -> $ ncu -u
6. Установить зависимости $ npm install
7. Запуск Gulp -> $ gulp
8. В папке проекта:
создать package.json
лучше через npm init
9. В папке проекта инсталляция gulp для конкретного проекта
npm install gulp –save-dev
package.json обновляется
10. Создать файл gulpfile.js для написания сценария сборки
создать иерархию файлов,
файл с исходниками src 
11. Протестировать что gulp работает, вставить в gulpfile.js код с их сайта и введя нужную команду в терминал (gulp) и сравниваем
с результатами на сайте

если возникли проблемы, то предлагается очистить кэш 
npm cache clean –force
npm install npm -g
повторить установку gulp глобально и gulp в проект 

Начальная структура файлов:
1. src // в ней также применимая архитектура
2. gulpfile.js // алгоритм работы сборки
3. package.json // указаны зависимости

==============

### Описание элементов сборки:

```
let {scr, dest} = require(‘gulp’) // переменная для облегчения
gulp = require(‘gulp’) // переменная для облегчения

let project_folder = ‘dist’ // папка, куда будет осуществлена сборка 
let source_folder = ‘#src’ // папка с исходниками
const path = 
{
    build: // объект, где указывается путь для выгружаемых файлов
   {
       html: project_folder + ’ / ‘,
       css: project_folder + ’/css/ ‘,
       js: project_folder + ’/js/ ‘,
       img: project_folder + ’/img/ ‘,
       fonts: project_folder + ’/fonts/ ‘,	   
   },
       src: // объект, где указывается путь для загружаемых файлов
   {
       html: source_folder + ’ /*.html ‘,
       css: source_folder + ’/scss/style.scss ‘, // указывается используемое расширение
и конкретный файл, который нужно обрабатывать (после / )
       js: source_folder + ’/js/index.js ‘, // указывается используемое расширение и конкретный файл,
который нужно обрабатывать (после / )
       img: source_folder + ’/img/**/*.{jpg, png, svg, gif, ico, webp}‘, // указывается, что слушаются
все файлы и папки, и уточняется расширение, которое будет использоваться(после / )
       fonts: source_folder + ’/fonts/*.{ttf} ‘, }‘, // указывается, что слушаются все файлы и папки,
и уточняется расширение, которое будет использоваться (после / )	   
   },
   watch: // объект, где указываются файлы, которые необходимо слушать непрерывно
   {
       html: source_folder + ’ / **/*.html‘,
       css: source_folder + ’/scss/**/*.scss ‘, 
       js: source_folder + ’/js/**/*..js ‘,
       img: source_folder + ’/img/**/*.{jpg, png, svg, gif, ico, webp}‘,
   },
   clean: ‘./’ + project_folder + ‘/’ // объект, который содержит путь к файлу для удаления прошлых версий
   {
       html: source_folder + ’ / **/*.html‘,
       css: source_folder + ’/scss/**/*.scss ‘, 
       js: source_folder + ’/js/**/*..js ‘,
       img: source_folder + ’/img/**/*.{jpg, png, svg, gif, ico, webp}‘,
   },
}

6. создание заданий для gulp

function build() //функция сборки html 
{
   return src(path.src.html) // откуда берется исходник html
   .pipe(dest(path.build.html) // специальная команда для gulp для сборки в указанное место
   .pipe(f_browsersync.stream()) // обновление страницы после сборки
}

let build = gulp.series(html)
exports.build = build
exports.html = html
```
==============

### ES6
Для активизации синтаксиса ES 6 – 2 варианта:
1) назвать файл gulpfile.mjs
2) дописать в packaje.json строку о модулях
```
{
  "name": "v3-ES6",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // <--------------
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "gulp": "^4.0.2",
  }
}
```

==============

Сборка № 3
```
"use strict";

/* Modules */
const {src, dest} =    require("gulp");
const gulp =           require("gulp");
const autoprefixer =   require("gulp-autoprefixer");
const cssbeautify =    require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename =         require("gulp-rename");
const sass =           require("gulp-sass");
const cssnano =        require("gulp-cssnano");
const uglify =         require("gulp-uglify");
const plumber =        require("gulp-plumber");
const panini =         require("panini");
const imagemin =       require("gulp-imagemin");
const del =            require("del");
const notify =         require("gulp-notify");
const webpack =        require('webpack');
const webpackStream =  require('webpack-stream');
const browserSync =    require("browser-sync").create();

/* Paths */
const srcPath = 'src/';                        // директория с ресурсами проекта
const distPath = 'dist/';                      // директория для сборки проекты

const path = {
    build: {                                   // под-директории для сборки проекта
        html:   distPath,
        js:     distPath + "assets/js/",
        css:    distPath + "assets/css/",
        images: distPath + "assets/images/",
        fonts:  distPath + "assets/fonts/"
    },
    src: {                                     // под-директории с ресурсами проекта
        html:   srcPath + "*.html",
        js:     srcPath + "assets/js/*.js",
        css:    srcPath + "assets/scss/*.scss",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {                                  // под-директории, за которыми будет вестись "наблюдение" 
    html:   srcPath + "**/*.html",
        js:     srcPath + "assets/js/**/*.js",
        css:    srcPath + "assets/scss/**/*.scss",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
}

/* Tasks */
function serve() {                            // задача - отслеживание изменений при сохранении
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}
function html(cb) {                           // задача - сборка html
    panini.refresh();                         // плагин - разбивка html на части
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(panini({
            root:       srcPath,
            layouts:    srcPath + 'layouts/',
            partials:   srcPath + 'partials/',
            helpers:    srcPath + 'helpers/',
            data:       srcPath + 'data/'
        }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
function css(cb) {                            // задача - сборка css из scss
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/'
        }))
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
function cssWatch(cb) {                          // задача - ускорение сборки css из scss
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/'
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
function js(cb) {                                 // задача - сборка js
    return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpackStream({
          mode: "production",
          output: {
            filename: 'app.js',
          },
          module: {
            rules: [
              {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                  presets: ['@babel/preset-env']
                }
              }
            ]
          }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
function jsWatch(cb) {                                 // задача - ускорение сборки js
return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpackStream({
          mode: "development",
          output: {
            filename: 'app.js',
          }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
function images(cb) {                                   // задача - сжатие картинок
    return src(path.src.images)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 95, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
function fonts(cb) {                                     // задача - перенос шрифтов из src в dist
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
function clean(cb) {                                     // задача - очистка директории dist в случае пересборки
return del(path.clean);

    cb();
}
function watchFiles() {                                  // задача - порядок отслеживания изменений
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], cssWatch);
    gulp.watch([path.watch.js], jsWatch);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, serve);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;

Команды для консоли 
$ gulp - запуск проекта
$ gulp build - сборка проекта
```
