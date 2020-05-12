const gulp = require('gulp');
const babel = require('gulp-babel');		//для трансшпиляции
const concat = require('gulp-concat');	//для объединения файлов
const uglify = require('gulp-uglify');	//для минификации js-файлов
const cssnano = require('gulp-cssnano');	//для минификации css-файлов

moving = () => {
	gulp.src('./source/**/*.js')
		.pipe(concat('all.js'))
		.pipe(babel({
    	presets: ['@babel/env']
    }))
    .pipe(uglify())
		.pipe(gulp.dest('./prod/js/'));

	gulp.src('./source/**/*.css')
		.pipe(concat('style.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('./prod/css/'));
}

gulp.task('mov', moving());
