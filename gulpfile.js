const gulp = require('gulp');
const babel = require('gulp-babel');

moving = () => {
	gulp.src('./source/**/*.js')
		.pipe(babel({
    	presets: ['@babel/env']
    }))
		.pipe(gulp.dest('./prod/'));

	gulp.src('./source/**/*.css')
		.pipe(gulp.dest('./prod/'));
}

gulp.task('mov', moving());
