import * as nodePath from 'path'                         // определяется корневой элемент

const rootFolder = nodePath.basename(nodePath.resolve()) // импортируется названия корневой директории = названия проекта
const srcFolder   = './src'
const builtFolder = './dist'

export const path =
{
    build:
    {
        html:   '${srcFolder}/',
        css:    '${srcFolder}/css/',
        js:     '${srcFolder}/js/',
        images: '${srcFolder}/img/'
    },
    src:
    {
        html:   '${srcFolder}/*.html',
        scss:   '${srcFolder}/scss/style.scss',
        js:     '${srcFolder}/js/app.js',
        images: '${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}',
        svg:    '${srcFolder}/img/**/*.svg'
    },
    watch:
    {
        html:   '${srcFolder}/**/*.html',
        scss:   '${srcFolder}/scss/**/*.html',
        js:     '${srcFolder}/js/**/*.js',
        images: '${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}'
    },
    clean:builtFolder,
    builtFolder: builtFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ''
}
