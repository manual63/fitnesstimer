var gulp = require( 'gulp' ),
less = require( 'gulp-less' ),
uglify = require( 'gulp-uglifyjs' )

gulp.task( 'default', [ 'less', 'move', 'uglify' ]);

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
	'./index.html'
]

gulp.task( 'move', function() {
	gulp.src( directories, { base: './' })
		.pipe( gulp.dest('dist/'));
});

gulp.task('uglify', function() {
  gulp.src('./js/main.js')
    .pipe(uglify('main.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('dist/js'))
});