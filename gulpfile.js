
var gulp = require('gulp');
var myth = require('gulp-myth');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var publishToBower = require('gulp-bower-publish');
var publishToNPM = require('gulp-npm-publish');


gulp.task('build:css', function () {
    return gulp.src('angie-tabs.css')
        .pipe(myth())
        .pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'));
});


gulp.task('build:js', function () {
    return gulp.src('angie-tabs.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'));
});


gulp.task('default', ['build:css', 'build:js']);


gulp.task('publish', ['default'], function () {
    publishToBower();
    publishToNPM([
        {
            skipGit: true
        }
    ]);
});