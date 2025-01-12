'use strict';

const {src, dest, watch, series} = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

function defaultTask() {
    return src('./src/styles/styles.less')
        .pipe(less())
        .pipe(concatCss("style.css"))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist'));
}

exports.default = defaultTask;

// Отслеживатель изменений SCSS
exports.watch = function () {
    watch('./src/styles/*.less', series('default'));
};