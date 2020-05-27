const path = {
	build: {
		style: 'build/css/',
		script: 'build/js/',
	},
	src: {
		style: 'source/**/*.css',
		script: 'source/**/*.js',
	}
};

const gulp = require('gulp');
const babel = require('gulp-babel');		//для трансшпиляции
const concat = require('gulp-concat');	//для объединения файлов
const uglify = require('gulp-uglify');	//для минификации js-файлов
const cssnano = require('gulp-cssnano');	//для минификации css-файлов
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

/* сборка скриптов в один файл *-min.js*/
gulp.task('build-scripts', () => {
	gulp.src(path.src.script)
		.pipe(sourcemaps.init())
			.pipe(concat('scripts-min.js'))
			.pipe(babel({
	    	presets: ['@babel/env']
	    }))
    	.pipe(uglify())
  	.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.script));
});

/* сборка стилей в один файл style-min.css*/
gulp.task('build-styles', () => {
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
			.pipe(concat('style-min.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.style));
});
gulp.task('default', ['browser-sync']);
gulp.task('build', ['build-styles', 'build-scripts']);
gulp.task('prod', ['build']);	//build for prod
gulp.task('dev', ['build', 'browser-sync']);	//build for dev

gulp.task('browser-sync', () => {
	browserSync.init({
    server: {
    	baseDir: "./build/"
    }
  });
	gulp.watch(path.src.script, ['watch-scripts']);
	gulp.watch(path.src.style, ['watch-styles']);
});

gulp.task('watch-styles', ['build-styles'], () => browserSync.reload());
gulp.task('watch-scripts', ['build-scripts'], () => browserSync.reload());
