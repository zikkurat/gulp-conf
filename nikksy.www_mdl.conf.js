<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>nikksy mdl version source(nikksy-mdl-source) target(nikksy-mdl-dest)</caption>
	<content>
	<![CDATA[
		// 载入插件 {{{
		var gulp = require('gulp'),
			less = require('gulp-less'), //less编译
			min_css = require('gulp-minify-css'), //压缩css
			uglify = require('gulp-uglify'), //转换、压缩JS
			concat = require('gulp-concat'), //合并文件
			rename = require('gulp-rename'), //重命名
			html_min = require('gulp-htmlmin'), //压缩html
			plumber = require('gulp-plumber'), //防止watch出错退出
			header = require('gulp-header'), //输出自定义头部
			sourcemaps = require('gulp-sourcemaps'), //源映射
			livereload = require('gulp-livereload'); //刷新浏览器
		//}}}

		// 定义工作路径 {{{
		var paths = {
			js: {
				src: ['../nikksy-mdl-source/**/*.js'],
				dest: '../nikksy-mdl-dest/',
				map: '.'
			},
			html: {
				src: '../nikksy-mdl-source/*.html',
				dest: '../nikksy-mdl-dest/'
			},
			less: {
				src: '../nikksy-mdl-source/**/*.less',
				dest: '../nikksy-mdl-dest/'
			}
		};
		//}}}

		//{{{ banner
		var banner = ['/*',
			' * http://www.nikksy.com/',
			' * Building: <%= time %>',
			' * Copyright <%= year %> nikksy.com',
			' */',
			''
		].join('\n');
		//}}}

		//{{{ getBuildingTime
		var getBuildingTime = function() {
			var date = new Date(),
				Y = date.getFullYear(),
				M = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
				D = date.getDate() > 10 ? date.getDate() : '0' + date.getDate(),
				h = date.getHours() > 10 ? date.getHours() : '0' + date.getHours(),
				m = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes(),
				s = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();

			return {
				time: Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s,
				year: Y
			};
		};
		//}}}
		
		// uglify {{{
		gulp.task('uglify', function() {
		    gulp.src(paths.js.src)
				.pipe(plumber())
				.pipe(sourcemaps.init())
		        .pipe(uglify())
		        .pipe(rename(function(path) {
		            if (path.basename.indexOf('load') === -1) {
		                path.basename += '.min';
		            }
		        }))
				.pipe(sourcemaps.write(paths.js.map))
				.pipe(gulp.dest(paths.js.dest))
				.pipe(livereload({auto:false}));
		});
		//}}}

		// less {{{
		gulp.task('less', function() {
			gulp.src(paths.less.src)
				.pipe(plumber())
				.pipe(less())
				.pipe(min_css({
					compatibility: 'ie7'
				}))
				.pipe(rename(function(path) {
					path.basename += '.min'
				}))
				.pipe(header(banner, getBuildingTime()))
				.pipe(gulp.dest(paths.less.dest))
				.pipe(livereload({
					auto: false
				}));
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
			gulp.watch(paths.js.src, ['uglify']);
			gulp.watch(paths.less.src, ['less']);
			gulp.watch(paths.html.src, ['html']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
