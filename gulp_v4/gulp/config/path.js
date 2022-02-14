import * as nodePath from 'path'                         // определяется корневой элемент
const rootFolder = nodePath.basename(nodePath.resolve()) // импортируется названия корневой директории = названия проекта

const srcFolder   = './src'
const builtFolder = './dist'

export const path =
{
    build:
    {
        html: '${srcFolder}/',
        css:  '${srcFolder}/css/'
    },
    src:
    {
        html: '${srcFolder}/*.html',
        scss: '${srcFolder}/scss/style.scss'
    },
    watch:
    {
        html: '${srcFolder}/**/*.html',
        scss: '${srcFolder}/scss/**/*.html'
    },
    clean:builtFolder,
    builtFolder: builtFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ''
}
