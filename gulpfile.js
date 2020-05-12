const gulp = require('gulp');
const babel = require('gulp-babel');		//для трансшпиляции
const concat = require('gulp-concat');	//для объединения файлов
const uglify = require('gulp-uglify');	//для минификации файлов

moving = () => {
	gulp.src('./source/**/*.js')
		.pipe(concat('all.js'))
		.pipe(babel({
    	presets: ['@babel/env']
    }))
    .pipe(uglify())
		.pipe(gulp.dest('./prod/'));

	gulp.src('./source/**/*.css')
		.pipe(gulp.dest('./prod/'));
}

gulp.task('mov', moving());
