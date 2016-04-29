<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>联赛第三季归档(nl_lol/3_source/) target(nl_lol/3/)</caption>
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
		var source = '../nikksy/nl_lol/3_source/',
			dest = '../nikksy/nl_lol/3/';

		var paths = {
			js: {
				src: '../nikksy/nikksy_league_source/**/*.js',
				dest: '../nikksy/nikksy_league/',
			},
			html: {
				src: source + '*.html'
			},
			less: {
				watch: '../nikksy/kayit_source/css3/*.less',
				src: '../nikksy/kayit_source/css3/main.less',
				dest: '../nikksy/kayit/css3/',
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
			var head = gulp.src(source + 'template/head.html'),
				nav = gulp.src(source + 'template/nav.html'),
				google = gulp.src(source + 'template/google_code.html'),
				footer = gulp.src(source + 'template/footer.html');

			gulp.src(paths.html.src)
				.pipe(changed(dest))
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
				.pipe(gulp.dest(dest))
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
