<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>nikksy 首页第三版 source(nikksy/www_v3) target(nikksy/v3)</caption>
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
			header = require('gulp-header');//输出自定义头
			changed = require('gulp-changed'); //真正修改过的文件才能通过管道
			sourcemaps = require('gulp-sourcemaps');//源映射
			livereload = require('gulp-livereload');//刷新浏览器
		//}}}

		// 定义工作路径 {{{
		var paths = {
			js: {
			        src: '../nikksy/www_v3/**/*.js',
			        dest: '../nikksy/v3/'
			    },
			    chat_room: {
			        src: '../nikksy/chat_room/*.js',
			        dest: '../nikksy/js/'
			    },
			    gift: {
			        src: '../nikksy/gift/*.js',
			        dest: '../nikksy/js/'
			    },
			    hb: {
			        src: '../nikksy/hb/*.js',
			        dest: '../nikksy/js/'
			    },
			    html: {
			        src: '../nikksy/www_v3/*.html',
			        dest: '../nikksy/',
			        src1: '../nikksy/www_v3/setup/*.html',
			        dest1: '../nikksy/v3/setup/',
			        src2: '../nikksy/www_v3/share/*.html',
			        dest2: '../nikksy/v3/share/',
					src3: '../nikksy/www_v3/assets/*.html',
					dest3: '../nikksy/v3/assets/'
			    }
		};
		//}}}

		//{{{ banner
		var banner = ['/*',
				' * http://www.nikksy.com/',
				' * Building: <%= time %>',
				' * Copyright 2015 nikksy.com',
				' */',
				''
			].join('\n');

		var getBuildingTime = function() {
				date = new Date();
				return {
					time: date.getFullYear() + '-' +
						(date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' +
						(date.getDate() > 10 ? date.getDate() : '0' + date.getDate()) + ' ' +
						(date.getHours() > 10 ? date.getHours() : '0' + date.getHours()) + ':' +
						(date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':' +
						(date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds())
				};
		};
		//}}}

		// uglify {{{
		gulp.task('uglify', function() {

			gulp.src(paths.js.src)
				.pipe(plumber())
				// .pipe(sourcemaps.init())
				.pipe(uglify())
				.pipe(rename(function(path) {
					if (path.basename.indexOf('load') === -1) {
						path.basename += '.min';
					}
				}))
				.pipe(changed(paths.js.dest))
				// pipe(gulp.dest(function(b) {
				//  if (b.relative.indexOf('load') === -1) {
				//  	return 'z:/abc/';
				//  }
				//  return false;
				// ))
				// .pipe(sourcemaps.write('.'))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest(paths.js.dest))
				.pipe(livereload({
					auto: false
				}));

		});
		//}}}

		// 艳宝的代码 {{{
		gulp.task('bb_code', function() {

			gulp.src('g:/http/site/nikksy/panel/*.js')
				.pipe(plumber())
				// .pipe(sourcemaps.init())
				.pipe(uglify())
				.pipe(rename(function(path) {
					if (path.basename.indexOf('load') === -1) {
						path.basename += '.min';
					}
				}))
				.pipe(changed(paths.js.dest))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest('g:/http/site/nikksy/js/'))
				.pipe(livereload({
					auto: false
				}));

		});
		//}}}

		// chat_room {{{
		gulp.task('chat_room', function() {
			gulp.src(paths.chat_room.src)
				.pipe(plumber())
				// .pipe(sourcemaps.init())
				.pipe(uglify())
				.pipe(rename(function(path) {
					path.basename += '.min';
				}))
				.pipe(changed(paths.js.dest))
				// .pipe(sourcemaps.write('.'))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest(paths.chat_room.dest))
				.pipe(livereload({
					auto: false
				}));
		});
		//}}}

		// gift {{{
		gulp.task('gift', function() {
			gulp.src(paths.gift.src)
				.pipe(plumber())
				// .pipe(sourcemaps.init())
				.pipe(uglify())
				.pipe(rename(function(path) {
					path.basename += '.min';
				}))
				.pipe(changed(paths.js.dest))
				// .pipe(sourcemaps.write('.'))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest(paths.gift.dest))
				.pipe(livereload({
					auto: false
				}));
		});
		//}}}

		// hb {{{
		gulp.task('hb', function() {
			gulp.src(paths.hb.src)
				.pipe(plumber())
				// .pipe(sourcemaps.init())
				.pipe(uglify())
				.pipe(rename(function(path) {
					path.basename += '.min';
				}))
				.pipe(changed(paths.js.dest))
				// .pipe(sourcemaps.write('.'))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest(paths.hb.dest))
				.pipe(livereload({
					auto: false
				}));
		});
		//}}}

		// 用户头像 {{{
		gulp.task('user_icon', function() {
			gulp.src('../nikksy/zksource/*.js')
				.pipe(plumber())
				// .pipe(sourcemaps.init())
				.pipe(uglify())
				.pipe(rename(function(path) {
					path.basename += '.min';
				}))
				.pipe(changed(paths.js.dest))
				// .pipe(sourcemaps.write('.'))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest('../nikksy/js/'))
				.pipe(livereload({
					auto: false
				}));
		});
		//}}}

		// less {{{
		gulp.task('less', function() {
			gulp.src('../nikksy/www_v3/files/*.less')
				.pipe(plumber())
				// .pipe(sourcemaps.init())
				.pipe(less())
				.pipe(min_css({
					compatibility: 'ie7'
				}))
				.pipe(rename(function(path) {
					path.basename += '.min'
				}))
				.pipe(changed('../nikksy/v3/files/'))
				// .pipe(sourcemaps.write('.'))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest('../nikksy/v3/files/'))
				.pipe(livereload({
					auto: false
				}));
		});
		//}}}

		// html {{{
		gulp.task('html', function() {
			gulp.src(paths.html.src)
				.pipe(changed(paths.html.dest))
				.pipe(plumber())
				.pipe(html_min({
					removeComments: true,
					collapseWhitespace: true
				}))
				.pipe(gulp.dest(paths.html.dest))
				.pipe(livereload({
					auto: false
				}));

			gulp.src(paths.html.src1)
				.pipe(changed(paths.html.dest1))
				.pipe(plumber())
				.pipe(html_min({
					removeComments: true,
					collapseWhitespace: true
				}))
				.pipe(gulp.dest(paths.html.dest1))
				.pipe(livereload({
					auto: false
				}));

			gulp.src(paths.html.src2)
				.pipe(changed(paths.html.dest2))
				.pipe(plumber())
				.pipe(html_min({
					removeComments: true,
					collapseWhitespace: true
				}))
				.pipe(gulp.dest(paths.html.dest2))
				.pipe(livereload({
					auto: false
				}));

			gulp.src(paths.html.src3)
				.pipe(changed(paths.html.dest3))
				.pipe(plumber())
				.pipe(html_min({
					removeComments: true,
					collapseWhitespace: true
				}))
				.pipe(gulp.dest(paths.html.dest3))
				.pipe(livereload({
					auto: false
				}));
		});
		//}}}

		// wathc{{{
		gulp.task('watch', function() {
			livereload.listen();
			gulp.watch(paths.js.src, ['uglify']);
			gulp.watch('g:/http/site/nikksy/panel/*.js', ['bb_code']);
			gulp.watch(paths.chat_room.src, ['chat_room']);
			gulp.watch(paths.gift.src, ['gift']);
			gulp.watch(paths.hb.src, ['hb']);
			gulp.watch('../nikksy/zksource/*.js', ['user_icon']);
			gulp.watch(['../nikksy/less/*.less',
			    '../nikksy/www_v3/**/*.less'
			], ['less']);
			gulp.watch(paths.html.src, ['html']);
			gulp.watch(paths.html.src1, ['html']);
			gulp.watch(paths.html.src2, ['html']);
			gulp.watch(paths.html.src3, ['html']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
