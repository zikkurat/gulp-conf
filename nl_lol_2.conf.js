<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>联赛第二季归档(nl_lol/2_source/) target(nl_lol/2/)</caption>
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
			plumber = require('gulp-plumber'),//防止watch出错退出
			changed = require('gulp-changed'), //真正修改过的文件才能通过管道
			sourcemaps = require('gulp-sourcemaps'),//源映射
			livereload = require('gulp-livereload'),//刷新浏览器
			inject = require('gulp-inject');//
		//}}}

		// 定义工作路径 {{{
		var paths = {
			js: {
				src: ['../nikksy/nl_lol/2_source/**/*.js'],
				dest: '../nikksy/nl_lol/2/',
				map: '.'
			},
			html: {
				src: '../nikksy/nl_lol/2_source/*.html',
				dest: '../nikksy/nl_lol/2/'
			},
			less: {
				watch: '../nikksy/nl_lol/2_source/**/*.less',
				src: '../nikksy/nl_lol/2_source/css/main.less',
				dest: '../nikksy/nl_lol/2/'
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
		            if (path.basename.indexOf('load') === -1) {
		                path.basename += '.min';
		            }
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
				.pipe(changed(paths.less.dest))
				.pipe(gulp.dest(paths.less.dest))
				.pipe(livereload({auto:false}));
		});
		//}}}

		// html {{{
		gulp.task('html', function() {
			var head = gulp.src('../nikksy/nl_lol/2_source/template/head.html'),
				nav = gulp.src('../nikksy/nl_lol/2_source/template/nav.html'),
				google = gulp.src('../nikksy/nl_lol/2_source/template/google_code.html'),
				footer = gulp.src('../nikksy/nl_lol/2_source/template/footer.html');

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
			gulp.watch(paths.html.src, ['html']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
