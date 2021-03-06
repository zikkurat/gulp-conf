<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>联赛报名</caption>
	<content>
	<![CDATA[
		// 载入插件 {{{
		var gulp = require('gulp'),
			less = require('gulp-less'),//less编译
			min_css = require('gulp-minify-css'),//压缩css
			uglify = require('gulp-uglify'),//转换、压缩JS
			concat = require('gulp-concat'),//合并文件
			rename = require('gulp-rename'),//重命名
			html_min = require('gulp-htmlmin'),//压缩html
			plumber = require('gulp-plumber');//防止watch出错退出
			changed = require('gulp-changed'); //真正修改过的文件才能通过管道
			sourcemaps = require('gulp-sourcemaps');//源映射
			livereload = require('gulp-livereload');//刷新浏览器
			inject = require('gulp-inject');//
		//}}}

		// 定义工作路径 {{{
		var paths = {
			js: {
				src: ['../nikksy/kayit_source/**/*.js'],
				dest: '../nikksy/kayit/'
			},
			html: {
				src: '../nikksy/kayit_source/*.html',
				dest: '../nikksy/kayit/'
			},
			less: {
				watch: '../nikksy/kayit_source/css/*.less',
				src: '../nikksy/kayit_source/css/main.less',
				dest: '../nikksy/kayit/css/',
				watch1: '../nikksy/kayit_source/css3/*.less',
				src1: '../nikksy/kayit_source/css3/main.less',
				dest1: '../nikksy/kayit/css3/',
				watch2: '../nikksy/kayit_source/cr/s1/css/*.less',
				src2: '../nikksy/kayit_source/cr/s1/css/main.less',
				dest2: '../nikksy/kayit/cr/s1/css/',
				watch3: '../nikksy/kayit_source/css4/*.less',
				src3: '../nikksy/kayit_source/css4/main.less',
				dest3: '../nikksy/kayit/css4/',
			}
		};
		//}}}

		// uglify {{{
		gulp.task('uglify', function() {
		    gulp.src(paths.js.src)
				.pipe(plumber())
				// .pipe(sourcemaps.init())
		        .pipe(uglify())
		        .pipe(rename(function(path) {
					path.basename += '.min';
		        }))
				.pipe(changed(paths.js.dest))
		        //.pipe(gulp.dest(function(b) {
				//	if (b.relative.indexOf('load') === -1) {
				//		return 'z:/abc/';
				//	}
				//	return false;
				//}))
				// .pipe(sourcemaps.write(paths.js.map))
				.pipe(gulp.dest(paths.js.dest))
				.pipe(livereload({auto:false}));
		});
		//}}}

		// less {{{
		gulp.task('less', function() {
			gulp.src(paths.less.src)
				.pipe(plumber())
				.pipe(less())
				.pipe(min_css({compatibility:'ie7'}))
				.pipe(rename(function(path) {
					path.basename += '.min'
				}))
				//.pipe(changed(paths.less.dest))
				.pipe(gulp.dest(paths.less.dest))
				.pipe(livereload({auto:false}));
		});

		gulp.task('less2', function() {
			gulp.src(paths.less.src1)
				.pipe(plumber())
				.pipe(less())
				.pipe(min_css({compatibility:'ie7'}))
				.pipe(rename(function(path) {
					path.basename += '.min'
				}))
				.pipe(gulp.dest(paths.less.dest1))
				.pipe(livereload({auto:false}));
		});

		gulp.task('less3', function() {
			gulp.src(paths.less.src2)
				.pipe(plumber())
				.pipe(less())
				.pipe(min_css({compatibility:'ie7'}))
				.pipe(rename(function(path) {
					path.basename += '.min'
				}))
				.pipe(gulp.dest(paths.less.dest2))
				.pipe(livereload({auto:false}));
		});

		gulp.task('less4', function() {
			gulp.src(paths.less.src3)
				.pipe(plumber())
				.pipe(less())
				.pipe(min_css({compatibility:'ie7'}))
				.pipe(rename(function(path) {
					path.basename += '.min'
				}))
				.pipe(gulp.dest(paths.less.dest3))
				.pipe(livereload({auto:false}));
		});
		//}}}

		// html {{{
		gulp.task('html', function() {
			var head = gulp.src('../nikksy/kayit_source/template/head.html'),
				nav = gulp.src('../nikksy/kayit_source/template/nav.html'),
				google = gulp.src('../nikksy/kayit_source/template/google_code.html'),
				footer = gulp.src('../nikksy/kayit_source/template/footer.html');

			gulp.src(paths.html.src)
				.pipe(changed(paths.html.dest))
				.pipe(plumber())
				.pipe(inject(head, {
					starttag: '<!--inject:head-->',
					transform: function(filePath, file) {
						return file.contents.toString('utf-8');
					}
				}))
				.pipe(inject(nav, {
					starttag: '<!--inject:nav-->',
					transform: function(filePath, file) {
						return file.contents.toString('utf-8');
					}
				}))
				.pipe(inject(footer, {
					starttag: '<!--inject:footer-->',
					transform: function(filePath, file) {
						return file.contents.toString('utf-8');
					}
				}))
				.pipe(inject(google, {
					starttag: '<!--inject:google-->',
					transform: function(filePath, file) {
						return file.contents.toString('utf-8');
					}
				}))
				.pipe(html_min({
					removeComments: true,
					collapseWhitespace: true
				}))
				.pipe(gulp.dest(paths.html.dest))
				.pipe(livereload({
					auto: false
				}));
		});
		//}}}

		// wathc{{{
		gulp.task('watch', function() {
			livereload.listen();
			gulp.watch(paths.js.src, ['uglify']);
			gulp.watch(paths.less.watch, ['less']);
			gulp.watch(paths.less.watch1, ['less2']);
			gulp.watch(paths.less.watch2, ['less3']);
			gulp.watch(paths.less.watch3, ['less4']);
			gulp.watch(paths.html.src, ['html']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
