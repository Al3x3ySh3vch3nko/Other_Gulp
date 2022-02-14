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
import {reset}  from './gulp/tasks/reset.js'
import {html}   from './gulp/tasks/html.js'
import {server} from './gulp/tasks/server.js'
import {scss}   from './gulp/tasks/scss.js'

// Наблюдатель
function watcher()
{
    gulp.watch(path.watch.html, html)
}

// Параллельное выполнение для главных задач
const mainTasks = gulp.parallel(copy, html, scss)

//Сценарий задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

// Выполнение сценария по умолчанию
gulp.tasks('default'.copy)