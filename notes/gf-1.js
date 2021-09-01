// ! Передача модуля в константу (создание триггера вызова модуля в функции (таскуе)
// ! Вызов задачи gulp name
// ! Незавершенная задача и завершенная (callback)
// !  gulp snippet
// ! Дефолтный таск и его вызов gulp

const gulp = require('gulp'); // триггер обращения

gulp.task('a', function (callback) {
	console.log('a!');
	callback()
})

gulp.task('b', function (callback) {
	console.log('b!');
	callback()
})

gulp.task('c', function (callback) {
	console.log('c!');
	callback()
})

gulp.task('d', function (callback) {
	console.log('d!');
	callback()
})

// дефолтный таск

// gulp.task('default', function (callback) {
// 	console.log('default!');
// 	callback()
// })

gulp.task('default', gulp.series('a', 'b', 'c', 'd'));

gulp.task('default', gulp.parallel('a', 'b', 'c', 'd'));

gulp.task('default', gulp.series('a', 'b', gulp.parallel('c', 'd')));
