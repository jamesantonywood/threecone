const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');

gulp.task('html', () => {
    return gulp.src('src/*.html')
               .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    return gulp.src('src/js/*.js')
                .pipe(webpack({
                    mode: 'production',
                    devtool: 'source-map',
                    output: {
                        filename: 'app.js',
                    }
                }))
               .pipe(gulp.dest('dist/js'))
               .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', gulp.series('js'));

});

gulp.task('default', gulp.series('html', 'js', 'watch'));