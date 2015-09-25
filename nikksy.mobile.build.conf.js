<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>nikksy 移动版打包 (nikksy/nikksy-mobile-source)</caption>
	<content>
	<![CDATA[

		// 载入插件 {{{
		var gulp = require('gulp'),
			less = require('gulp-less'),//less编译
			min_css = require('gulp-minify-css'),//压缩css
			uglify = require('gulp-uglify'),//转换、压缩JS
			//concat = require('gulp-concat'),//合并文件
			rename = require('gulp-rename'),//重命名
			html_min = require('gulp-htmlmin');//压缩html
			//plumber = require('gulp-plumber'),//防止watch出错退出
			//changed = require('gulp-changed'),//真正修改过的文件才能通过管道
			// sourcemaps = require('gulp-sourcemaps'),//源映射
			//livereload = require('gulp-livereload');//刷新浏览器
		//}}}

		//{{{ 定义工作路径
		var build_path = {
				source: '../nikksy-mobile-source/',
				dest: 'z:/pack/'
			},
			paths = {
				js: {
					src: build_path.source + 'js/*.js',
					dest: build_path.dest + 'js'
				},
				html: {
					src: build_path.source + '*.html',
					dest: build_path.dest
				},
				less: {
					src: build_path.source + 'css/*.less',
					dest: build_path.dest + 'css'
				},
				image: {
					src: build_path.source + 'img/*.{png,gif,jpg}',
					dest: build_path.dest + 'img'
				},
			};
		//}}}

		//{{{ uglify
		gulp.task('uglify', function() {
			gulp.src(paths.js.src)
				.pipe(uglify())
				.pipe(rename(function(path) {
					path.basename += '.min';
				}))
				.pipe(gulp.dest(paths.js.dest));
		});
		//}}}

		//{{{ less
		gulp.task('less', function() {
			gulp.src(paths.less.src)
				.pipe(less())
				.pipe(min_css({compatibility:'ie7'}))
				.pipe(rename(function(path) {
					path.basename += '.min';
				}))
				.pipe(gulp.dest(paths.less.dest));
		});
		//}}}

		//{{{ html
		gulp.task('html', function() {
			gulp.src(paths.html.src)
				.pipe(html_min({
					removeComments: true,
					collapseWhitespace: true
				}))
				.pipe(gulp.dest(paths.html.dest));
		});
		//}}}

		//{{{ images
		gulp.task('images', function() {
			gulp.src(paths.image.src).pipe(gulp.dest(paths.image.dest));
		});
		//}}}

		gulp.task('default', ['less', 'html', 'uglify', 'images']);
	]]>
	</content>
</body>
