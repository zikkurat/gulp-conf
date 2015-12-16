<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>nikksy 联赛 source(nikksy/nikksy_league_source) target(nikksy/nikksy_league)</caption>
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
		//}}}

		// 定义工作路径 {{{
		var paths = {
			js: {
				src: ['../nikksy/nikksy_league_source/**/*.js'],
				dest: '../nikksy/nikksy_league/',
				map: '.'
			},
			html: {
				src: '../nikksy/nikksy_league_source/*.html',
				dest: '../nikksy/nikksy_league'
			},
			less: {
				src: '../nikksy/nikksy_league_source/**/*.less',
				dest: '../nikksy/nikksy_league/'
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
			gulp.src(paths.html.src)
				.pipe(changed(paths.html.dest))
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
