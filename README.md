# Other_Gulp
Gulp builts

=======
Справка
=======

-	требует Node js
-	установить gulp глобально

1. В папке проекта:
создать package.json
лучше через npm init

2. В папке проекта инсталляция gulp для конкретного проекта
npm install gulp –save-dev

package.json обновляется

3. Создать файл gulpfile.js для написания сценария сборки

создать иерархию файлов.

-  файл с исходниками src 

4. Протестировать что gulp работает, вставить в gulpfile.js код с их сайта и введя нужную команду в терминал (gulp) и сравниваем
с результатами на сайте

если возникли проблемы, то предлагается очистить кэш 
npm cache clean –force
npm install npm -g
повторить установку gulp глобально и gulp в проект 

Начальная структура файлов:
1. src // в ней также применимая архитектура
2. gulpfile.js // алгоритм работы сборки
3. package.json // указаны зависимости

==========================
Описание элементов сборки:
==========================

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
       js: source_folder + ’/js/index.js ‘, // указывается используемое расширение и конкретный файл, который нужно обрабатывать (после / )
       img: source_folder + ’/img/**/*.{jpg, png, svg, gif, ico, webp}‘, // указывается, что слушаются все файлы и папки, и уточняется расширение, которое будет использоваться(после / )
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
