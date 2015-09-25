<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>nikksy 客户端 source(nikksy/client/source) target(nikksy/client)</caption>
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
			livereload = require('gulp-livereload');//刷新浏览器
		//}}}

		// 定义工作路径 {{{
		var paths = {
			js: {
				src: '../nikksy/client/source/files/*.js',
				dest: '../nikksy/client/files/'
			},
			html: {
				src: '../nikksy/client/source/*.html',
				dest: '../nikksy/client/'
			},
			less: {
				src: '../nikksy/client/source/files/*.less',
				dest: '../nikksy/client/files/'
			}
		};
		//}}}

		// javascript {{{
		gulp.task('main_script', function() {
		    gulp.src(['../nikksy/client/source/files/language.js',
		            '../nikksy/client/source/files/tools.js',
		            '../nikksy/client/source/files/url.js',
		            '../nikksy/client/source/files/control.js',
		            '../nikksy/client/source/files/my_share.js',
		            '../nikksy/client/source/files/submit_client.js',
		            '../nikksy/client/source/files/video_client.js',
		            '../nikksy/client/source/files/list.js',
		            '../nikksy/client/source/files/init.js'])
				.pipe(plumber())
		        .pipe(concat('main.min.js'))
		        .pipe(uglify())
		        .pipe(gulp.dest(paths.js.dest))
				.pipe(livereload({auto:false}));
		});
		//}}}

		//{{{
		gulp.task('load_script', function() {
			gulp.src('../nikksy/client/source/files/load.js')
				.pipe(plumber())
		        .pipe(uglify())
		        .pipe(gulp.dest(paths.js.dest))
				.pipe(livereload({auto:false}));
		});
		//}}}

		//{{{
		gulp.task('champion_display_name', function() {
			gulp.src('../nikksy/client/source/files/champion_display_name.js')
				.pipe(plumber())
		        .pipe(uglify())
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
				.pipe(gulp.dest(paths.less.dest))
				.pipe(livereload({auto:false}));
		});
		//}}}

		// html {{{
		gulp.task('html', function() {
			gulp.src(paths.html.src)
				.pipe(plumber())
		        .pipe(html_min({
					removeComments:true,
					collapseWhitespace:true
				}))
				.pipe(gulp.dest(paths.html.dest))
				.pipe(livereload({auto:false}));
		});
		//}}}

		// wathc{{{
		gulp.task('watch', function() {
			livereload.listen();
			gulp.watch(paths.js.src, ['main_script']);
			gulp.watch(paths.js.src, ['load_script']);
			gulp.watch(paths.js.src, ['champion_display_name']);
			gulp.watch(paths.less.src, ['less']);
			gulp.watch(paths.html.src, ['html']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
