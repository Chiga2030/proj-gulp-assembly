const gulp = require('gulp');

moving = () => {
	gulp.src('./source/**/*.js')
		.pipe(gulp.dest('./prod/'));

	gulp.src('./source/**/*.css')
		.pipe(gulp.dest('./prod/'));
}

gulp.task('mov', moving());
