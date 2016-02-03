<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>联赛第二季(nikksy/lol2_source) target(nikksy/lol2)</caption>
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
				src: ['../nikksy/nikksy_league_source/**/*.js'],
				dest: '../nikksy/nikksy_league/',
				src1: ['../nikksy/kayit_source/**/*.js'],
				dest1: '../nikksy/kayit/',
				map: '.'
			},
			html: {
				src: '../nikksy/nikksy_league_source/*.html',
				dest: '../nikksy/nikksy_league/',
				src1: '../nikksy/kayit_source/*.html',
				dest1: '../nikksy/kayit/'
			},
			less: {
				watch: '../nikksy/nikksy_league_source/**/*.less',
				src: '../nikksy/nikksy_league_source/css/main.less',
				dest: '../nikksy/nikksy_league/css/',
				watch1: '../nikksy/kayit_source/**/*.less',
				src1: '../nikksy/kayit_source/css/main.less',
				dest1: '../nikksy/kayit/css/'
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

		gulp.task('uglify2', function() {
		    gulp.src(paths.js.src1)
				.pipe(plumber())
		        .pipe(uglify())
		        .pipe(rename(function(path) {
					path.basename += '.min';
		        }))
				.pipe(changed(paths.js.dest))
				.pipe(gulp.dest(paths.js.dest1))
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
		
		gulp.task('html2', function() {
			var head = gulp.src('../nikksy/kayit_source/template/head.html'),
				nav = gulp.src('../nikksy/kayit_source/template/nav.html'),
				google = gulp.src('../nikksy/kayit_source/template/google_code.html'),
				footer = gulp.src('../nikksy/kayit_source/template/footer.html');

			gulp.src(paths.html.src1)
				.pipe(changed(paths.html.dest1))
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
				.pipe(gulp.dest(paths.html.dest1))
				.pipe(livereload({
					auto: false
				}));
		});

		//}}}

		// wathc{{{
		gulp.task('watch', function() {
			livereload.listen();
			gulp.watch(paths.js.src, ['uglify']);
			gulp.watch(paths.js.src1, ['uglify2']);
			gulp.watch(paths.less.watch, ['less']);
			gulp.watch(paths.less.watch1, ['less2']);
			gulp.watch(paths.html.src, ['html']);
			gulp.watch(paths.html.src1, ['html2']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
