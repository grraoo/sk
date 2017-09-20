var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
var gcmq = require('gulp-group-css-media-queries');
var cleanCSS = require('gulp-clean-css');
var deletefile = require('gulp-delete-file');
const typograf = require('gulp-typograf');

var config = {
	src: 'src/',
	dest: 'build/',
	css: {
		src: 'precss/**/*.scss',
		dest: 'css'
	},
	html: {
		src: '*.html',
	}
}

gulp.task('imgmin', () =>
    gulp.src('src/img/**/*')
        .pipe(imagemin([
					imagemin.gifsicle({interlaced: true}),
					imagemin.jpegtran({progressive: true}),
					imagemin.optipng({optimizationLevel: 3}),
					imagemin.svgo({plugins: [{removeViewBox: true}]})
				], {
					verbose: true
				}))
				.pipe(gulp.dest(config.dest + '/img'))
);

gulp.task('imgdel', ['imgmin'], function() {
	gulp.src('src/img/**/*')
	.pipe(deletefile({
		reg: '((.+).jpg)|((.+).png)|((.+).svg)',
		deleteMatch: true
	}))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './build'
		},
		ghostMode: false
  });
});


gulp.task('build', function() {

  return gulp.src(config.src + config.css.src)
    .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(gulp.dest(config.dest + config.css.dest))

		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('copyHtml', function() {

	return gulp.src(config.src + config.html.src)
		.pipe(typograf({ locale: ['ru'] }))
  	.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});


gulp.task('watch', ['browserSync'], function() {
	gulp.watch(config.src + config.css.src, function() {
		setTimeout(function(){
			gulp.start('build');
		}, 500);
	});
	gulp.watch(config.src + config.html.src, ['copyHtml']);
});
