const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');

gulp.task('pug', function () {
	return gulp.src('./#src/pug/pages/**/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Pug',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./#src/'))
});


// Таск для компиляции SCSS в CSS
gulp.task('scss', function (callback) {
	return gulp.src('./#src/scss/style.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Styles',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./#src/css/'))
	callback();
});

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function () {
	// Слежение за HTML и CSS и обновление браузера
	watch(['./#src/*.html', './#src/css/**/*.css'], gulp.parallel(browserSync.reload));

	// Слежение за SCSS и компиляция в CSS - обычный способ
	watch('./#src/scss/**/*.scss', gulp.parallel('scss'));

	// Запуск слежения и компиляции SCSS с задержкой, для жесктих дисков HDD
	// watch('./#src/scss/**/*.scss', function () {
	// 	setTimeout(gulp.parallel('scss'), 1000)
	// })

	// Слежение за HTML и сборка страниц и шаблонов
	// watch('./#src/html/**/*.html', gulp.parallel('html'))
	watch('./#src/pug/**/*.pug', gulp.parallel('pug'))
});

// Задача для старта сервера из папки #src
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./#src/"
		}
	})
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task('default', gulp.parallel('server', 'watch', 'scss', 'pug'));
