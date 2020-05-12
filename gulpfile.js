const path = {
	build: './build/',
};
const gulp = require('gulp');
const babel = require('gulp-babel');		//для трансшпиляции
const concat = require('gulp-concat');	//для объединения файлов
const uglify = require('gulp-uglify');	//для минификации js-файлов
const cssnano = require('gulp-cssnano');	//для минификации css-файлов
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build-js', () => {
	gulp.src('./source/**/*.js')
		.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
			.pipe(babel({
    		presets: ['@babel/env']
    	}))
    	.pipe(uglify())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build + 'js/'));
});

gulp.task('build-css', () => {
	gulp.src('./source/**/*.css')
		.pipe(sourcemaps.init())
			.pipe(concat('style.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build + 'css/'));
});

gulp.task('default', ['build-js', 'build-css']);
