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
const browserSync = require('browser-sync').create();

gulp.task('build-js', () => {
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

gulp.task('default', ['browser-sync']);



gulp.task('browser-sync', () => {
	browserSync.init({
    server: {
    	baseDir: "./build/"
    }
  });

	gulp.watch(path.src.js, ['watch-js']);
	gulp.watch(path.src.css, ['watch-css']);
});

gulp.task('watch-js', ['build-js'], () => browserSync.reload());
gulp.task('watch-css', ['build-css'], () => browserSync.reload());
