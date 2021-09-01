// ! npm install -g browser-sync

// ! npm install --save-dev gulp-watch

// ! npm install --save-dev sass gulp-sass

// ! npm install --save-dev gulp-autoprefixer
// ! npm install --save-dev gulp-sourcemaps
sourcemap показывает в инспекторе scss
// ! npm install --save-dev gulp-plumber gulp-notify
npm install--save - dev gulp - file - include
npm i--save - dev gulp - pug


gulp.task('watch', function () {
	watch('./app/index.html', gulp.parallel(browserSync.reload));
})

gulp.task('watch', function () {
	watch(['./app/index.html', './app/**/*.css'], gulp.parallel(browserSync.reload));
})
