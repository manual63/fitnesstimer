var gulp = require( 'gulp' ),
less = require( 'gulp-less' ),
concat = require( 'gulp-concat' ),
uglify = require( 'gulp-uglifyjs' );

gulp.task( 'default', [ 'less', 'move', 'concat-main' ]);

gulp.task( 'watch', function() {
	gulp.watch( 'less/*less', [ 'less' ] );
});

gulp.task( 'less', function() {
	return gulp.src( './src/less/main.less' )
		.pipe( less() )
		.pipe( gulp.dest( './dist/css' ) );
});

var pages = [
	'./index.html'
];

var directories = [
	'./fonts/*', 
	'./css/*.css',
	'./classes/*.json',
	'./data/*.json',
	'./js/vendor/**/*',
	'./src/js/**/*.js',
	'./templates/*.html',
	'./index.html',
	'./api/**/*'
];

gulp.task( 'move', function() {
	gulp.src( directories, { base: './' })
		.pipe( gulp.dest('dist/'));
});

var mainFiles = [
	'./src/js/models/*.js',
	'./src/js/routers/*js',
	'./src/js/views/*.js',
	'./src/js/main.js'
];

gulp.task( 'concat-main', function() {
	return gulp.src( mainFiles )
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', function() {
  gulp.src('./js/main.js')
    .pipe(uglify('main.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('dist/js'));
});