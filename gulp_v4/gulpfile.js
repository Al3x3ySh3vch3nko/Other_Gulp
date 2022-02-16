import gulp      from 'gulp'
import {path}    from 'gulp/config/path.js'
import {plugins} from 'gulp/config/plugins.js'

global.app =                            // переменная для удобства
{
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Импорт задач
import {reset}                           from './gulp/tasks/reset.js'
import {html}                            from './gulp/tasks/html.js'
import {server}                          from './gulp/tasks/server.js'
import {scss}                            from './gulp/tasks/scss.js'
import {js}                              from './gulp/tasks/js.js'
import {images}                          from './gulp/tasks/images.js'
import {svgSprites}                      from './gulp/tasks/svgSprites.js'
import {otfToTtf, ttfToWoff, fontsStyle} from './gulp/tasks/fonts.js'

// Наблюдатель
function watcher()
{
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}
//

//Для спрайтов
export {svgSprites}

//Отдельно для шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Параллельное выполнение для главных задач
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images))

//Сценарий задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

// Выполнение сценария по умолчанию
gulp.tasks('default'.copy)