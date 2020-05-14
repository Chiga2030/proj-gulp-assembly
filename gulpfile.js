const path = {
	build: {
		css: 'build/css/',
		js: 'build/js/',
	},
	src: {
		css: 'source/**/*.css',
		js: 'source/**/*.js',
	}
};
const gulp = require('gulp');
const babel = require('gulp-babel');		//для трансшпиляции
const concat = require('gulp-concat');	//для объединения файлов
const uglify = require('gulp-uglify');	//для минификации js-файлов
const cssnano = require('gulp-cssnano');	//для минификации css-файлов
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build-js', () => {
	//gulp.src(path.src.js)
	gulp.src(path.src.js)
		.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
			.pipe(babel({
	    	presets: ['@babel/env']
	    }))
    	.pipe(uglify())
  	.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js));
});

gulp.task('build-css', () => {
	gulp.src(path.src.css)
		.pipe(sourcemaps.init())
			.pipe(concat('style.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('default', ['build-js', 'build-css']);

gulp.task('watch', () => {
	gulp.watch(path.src.js, ['build-js'])
	gulp.watch(path.src.css, ['build-css'])
});
