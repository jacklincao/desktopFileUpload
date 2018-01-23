var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './',
			index: './index.html'
		}
	});

    gulp.watch('./src/css/common/common.css').on('change', browserSync.reload);
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch('./src/js/index.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);